import type { RequestHandler } from 'express'
import { Todo } from "../models/todo.js";

const Todos: Todo[] = []

export const createTodo: RequestHandler = (req, res, next) => {
    const text = (req.body as { text: string }).text;
    const newTodo = new Todo(crypto.randomUUID(), text)
    Todos.push(newTodo)
    res.status(201).json({message:'Todo Created' , todo:newTodo})
}
 