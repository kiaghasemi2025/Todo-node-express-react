import type { RequestHandler } from 'express'
import TodoModel from '../models/todo.js';
import type { CreateTodoInput, UpdateTodoInput } from '../schemas/todo.js'

export const getTodos: RequestHandler = async (_req, res) => {

        const todos = await TodoModel.find().lean();
        res.status(200).json({ todos })
}

export const addTodo: RequestHandler<unknown, unknown, CreateTodoInput> = async (req, res) => {

        const todo = await TodoModel.create(req.body)
        res.status(201).json({ message: 'Todo added', todo })

}

export const updateTodo: RequestHandler<{ id: string }, unknown, UpdateTodoInput> = async (req, res) => {
        const todo = await TodoModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { returnDocument: "after", runValidators: true }
        );
        if (!todo) {
                res.status(404).json({ message: 'Todo not found' })
                return
        }
        res.status(200).json({ message: 'Todo updated', todo })
}

export const deleteTodo: RequestHandler = async (req, res) => {
        const { id } = req.params

        const todo = await TodoModel.findByIdAndDelete(id)

        if (!todo) {
                res.status(404).json({ message: 'Todo not found' })
                return
        }

        res.status(200).json({ message: 'Todo Deleted Successfully', todo })
}