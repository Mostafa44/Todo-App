import * as uuid from 'uuid'

import { TodoItem } from '../models/TodoItem'
import { TodoItemAccess } from '../dataLayer/todosAccess'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { parseUserId } from '../auth/utils'

const todoAccess = new TodoItemAccess()

export async function getAllTodoItems(): Promise<TodoItem[]> {
    return todoAccess.getAllTodoItems()
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
