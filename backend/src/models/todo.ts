import { Schema, model } from 'mongoose'
import type { InferSchemaType } from 'mongoose'

const todoSchema = new Schema({
    text: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, required: true, default: false }
}, { timestamps: true })

export type Todo = InferSchemaType<typeof todoSchema>
export default model<Todo>("Todos", todoSchema)