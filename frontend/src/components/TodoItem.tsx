import type {Todo} from "../types/todo";

interface Props {
    todo:Todo;
    onToggle:(todo:Todo) => void;
    onDelete:(id:string) => void
}

export default function TodoItem({todo,onToggle,onDelete}:Props) {
    const checkTodo:string = todo.status == true? 'line-through' : '';
    return(
        <div className="Card">
            <div className="Card--text">
                <h1 className={checkTodo}>{todo.text}</h1>
                <span className={checkTodo}>{todo.description}</span>
            </div>
            <div className="Card--button">
                <button className={todo.status ? 'hide-button' : 'Card--button__done'} onClick={() => onToggle(todo)}>Complete</button>
                <button className="Card--button__delete" onClick={() => onDelete(todo._id)}>Delete</button>
            </div>
        </div>
    )
}