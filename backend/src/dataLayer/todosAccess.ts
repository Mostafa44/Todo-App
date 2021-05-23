import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
const logger = createLogger('create-todo');
const XAWS = AWSXRay.captureAWS(AWS) // debug tool to keep track of user requests
//const XAWS = AWS // debug tool to keep track of user requests

import { TodoItem } from '../models/TodoItem'
//import { throws } from 'assert';

export class TodoItemAccess {

    constructor(
        private readonly docClient: DocumentClient = createDynamoDBClient(),
        private readonly todosTable = process.env.TODOS_TABLE) {
    }

    async getAllTodoItems(userId: string): Promise<TodoItem[]> {
        logger.info('Getting all todos')
        const params = {
            TableName: this.todosTable,
            FilterExpression: "#userId = :userId",
            ExpressionAttributeNames: {
                "#userId": "userId",
            },
            ExpressionAttributeValues: {
                ':userId': userId,
            }
        };
        const result = await this.docClient.scan(params).promise()

        const items = result.Items
        return items as TodoItem[]
    }

    async createTodoItem(todo: TodoItem): Promise<TodoItem> {
        await this.docClient.put({
            TableName: this.todosTable,
            Item: todo
        }).promise()

        return todo
    }
    async deleteTodoItem(todoItemId: string, userId: string): Promise<TodoItem> {
        const itemToBeDeleted = await this.docClient.delete({
            TableName: this.todosTable,
            Key: {
                id: todoItemId,
                userId: userId
            },
            ReturnValues: 'ALL_OLD'
        }).promise();
        return itemToBeDeleted.Attributes as TodoItem;
    }

}

function createDynamoDBClient() {
    if (process.env.IS_OFFLINE) {
        logger.info('Creating a local DynamoDB instance')
        return new XAWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000'
        })
    }

    return new XAWS.DynamoDB.DocumentClient()
}
