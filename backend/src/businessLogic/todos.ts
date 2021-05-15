import * as uuid from 'uuid'

import { TodoItem } from '../models/TodoItem'
import { TodoItemAccess } from '../dataLayer/todosAccess'
import { CreateTodoItemRequest } from '../requests/CreateTodoItemRequest'
import { parseUserId } from '../auth/utils'

const todoAccess = new TodoItemAccess()

export async function getAllTodoItems(): Promise<TodoItem[]> {
    return todoAccess.getAllTodoItems()
}

export async function createTodoItem(
    createTodoItemRequest: CreateTodoItemRequest,
    jwtToken: string
): Promise<TodoItem> {

    const itemId = uuid.v4()
    const userId = parseUserId(jwtToken)

    return await todoAccess.createTodoItem({
        todoId: itemId,
        userId: userId,
        name: createTodoItemRequest.name,
        dueDate: createTodoItemRequest.dueDate,
        done: false,
        createdAt: new Date().toISOString(),
        attachmentUrl: createTodoItemRequest.attachmentUrl ?? null
    })
}
