import type { RequestHandler } from 'express'
import { Todo } from "../models/todo.js";

const Todos: Todo[] = []

export const createTodo: RequestHandler = (req, res, next) => {
    const text = (req.body as { text: string }).text;
    const newTodo = new Todo(crypto.randomUUID(), text)
    Todos.push(newTodo)
    res.status(201).json({ message: 'Todo Created', todo: newTodo })
}

export const getTodos: RequestHandler = (req, res, next) => {
    res.json({ todo: Todos })
}

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {

    const todoId = req.params.id;

    const todoIndex = Todos.findIndex(todo => todo.id === todoId)


    if (todoIndex < 0) {
        return res.status(404).json({ message: "Cannot find todo" })
    }

    const updatedText = (req.body as { text: string }).text;

    Todos[todoIndex] = new Todo(Todos[todoIndex]!.id, updatedText)

    res.status(202).json({ message: "Todo updated", todo: Todos[todoIndex] })

}

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {

    const todoId = req.params.id;

    const todoIndex = Todos.findIndex(todo => todo.id === todoId);

    if (todoIndex < 0) {
        return res.status(404).json({ message: "Cannot find todo" })
    }

    const result = Todos.splice(todoIndex, 1)


    res.status(202).json({ message: "Todo Deleted", todo: result })
}