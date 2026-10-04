import type {Todo} from "../types/todo";

interface Props {
    todo:Todo;
    onToggle:(todo:Todo) => void;
    onDelete:(id:string) => void
}

export default function TodoItem({todo,onToggle,onDelete}:Props) {
    return(
        <div>
            <div>
                <h1>{todo.text}</h1>
                <span>{todo.description}</span>
            </div>
            <div>
                <button onClick={() => onToggle(todo)}>Complete</button>
                <button onClick={() => onDelete(todo._id)}>Delete</button>
            </div>
        </div>
    )
}