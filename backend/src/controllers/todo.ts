import type { RequestHandler } from 'express'
import TodoModel from '../models/todo.js';
import type { Todo } from '../models/todo.js';

export const getTodos: RequestHandler = async (_req, res) => {

        const todos = await TodoModel.find().lean();
        res.status(200).json({ todos })


}

export const addTodo: RequestHandler = async (req, res) => {

        const { text, description } = req.body as Pick<Todo, 'text' | 'description'>;
        const todo = await TodoModel.create({ text, description })
        res.status(201).json({ message: 'Todo added', todo })

}

export const updateTodo: RequestHandler = async (req, res) => {
        const { id } = req.params;
        const { text, description, status } = req.body as Partial<Pick<Todo, 'text' | 'description' | 'status'>>
        const todo = await TodoModel.findByIdAndUpdate(
                id,
                { text, description, status },
                { returnDocument: "after", runValidators: true }
        );
        if (!todo) {
                res.status(404).json({ message: 'Todo not found' })
                return
        }
        res.status(201).json({ message: 'Todo updated', todo })
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