import axios from 'axios';
import type { Todo, TodoResponse, TodosResponse, MessageResponse } from './types/todo'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

type NewTodo = Pick<Todo, 'text' | 'description'>;
type TodoUpdate = Partial<Pick<Todo, 'text' | 'description' | 'status'>>;

export const getTodos = async () => {
    const { data } = await api.get<TodosResponse>('/todos')
    return data.todos
}

export const addTodo = async (todo: NewTodo) => {
    const { data } = await api.post<TodoResponse>('/todos', todo)
    return data.todo
}

export const updateTodo = async (id: string, todo: TodoUpdate) => {
    const { data } = await api.patch<TodoResponse>(`/todos/${id}`, todo);
    return data.todo
}

export const deleteTodo = async (id: string) => {
    const { data } = await api.delete<MessageResponse>(`/todos/${id}`);
    return data.message
}