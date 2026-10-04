import { useState } from 'react';
import type { NewTodo } from '../types/todo';
import type { FormEvent } from 'react';

interface Props {
    onAdd: (todo: NewTodo) => void;
}

export default function AddTodo({ onAdd }: Props) {
    const [text, setText] = useState("");
    const [description, setDescription] = useState("")

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onAdd({ text, description });
        setText("");
        setDescription("")
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Title"
                        required
                    />
                </div>
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                />
            </div>
            <div>
                <button type="submit">Add Todo</button>
            </div>

        </form>
    );
}
