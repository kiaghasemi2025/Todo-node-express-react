export interface Todo {
    _id: string,
    text: string,
    description: string,
    status: boolean,
    createdAt: string,
    updatedAt: string
}

export interface TodosResponse {
    todos: Todo[]
}

export interface TodoResponse {
    message: string,
    todo:Todo
}

export interface MessageResponse {
    message:string
}
