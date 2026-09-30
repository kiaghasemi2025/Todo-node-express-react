import type { RequestHandler } from 'express'
import TodoModel from '../models/todo.js';
import type { Todo } from '../models/todo.js';


export const getTodos:RequestHandler = async (_req, res) => {

        const todos = await TodoModel.find().lean();
        res.status(200).json({ todos })


}

export const addTodo:RequestHandler = async (req, res) => {

        const {text,description} = req.body as Pick<Todo, 'text' | 'description'>;
        const todo = await TodoModel.create({text,description})

        res.status(201).json({ message: 'Todo added', todo })

}