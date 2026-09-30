import { Schema, model } from 'mongoose'

interface Todo {
    text: string;
    description: string;
    status: boolean
}

const todoSchema = new Schema<Todo>({
    text: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, required: true }
})


export default model<Todo>("Todo", todoSchema)