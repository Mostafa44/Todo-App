import * as uuid from 'uuid'

import { TodoItem } from '../models/TodoItem'
import { TodoItemAccess } from '../dataLayer/todosAccess'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { parseUserId } from '../auth/utils'

const todoAccess = new TodoItemAccess()

export async function getAllTodoItems(jwtToken: string): Promise<TodoItem[]> {
    const userId = parseUserId(jwtToken);
    return todoAccess.getAllTodoItems(userId)
}

export async function createTodoItem(
    createTodoItemRequest: CreateTodoRequest,
    jwtToken: string
): Promise<TodoItem> {

    const itemId = uuid.v4()
    const userId = parseUserId(jwtToken)

    return await todoAccess.createTodoItem({
        id: itemId,
        userId: userId,
        name: createTodoItemRequest.name,
        dueDate: createTodoItemRequest.dueDate,
        done: false,
        createdAt: new Date().toISOString(),
        attachmentUrl: createTodoItemRequest.attachmentUrl
    })
}
export async function deleteTodoItem(todoItemId: string, jwtToken: string): Promise<TodoItem> {
    const userId = parseUserId(jwtToken);
    return await todoAccess.deleteTodoItem(todoItemId, userId)
}
