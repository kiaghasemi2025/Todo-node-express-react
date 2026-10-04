import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./api";
// import './index.css'
import AddTodo from "./components/AddTodo";
import TodoItem from "./components/TodoItem";
import type { Todo, NewTodo } from "./types/todo";

export default function App() {
  const queryClient = useQueryClient();

  const { data: todos, isPending, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const refreshTodos = () =>
    queryClient.invalidateQueries({ queryKey: ["todos"] });

  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: refreshTodos,
  });

  const toggleMutation = useMutation({
    mutationFn: (todo: Todo) => updateTodo(todo._id, { status: !todo.status }),
    onSuccess: refreshTodos,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: refreshTodos,
  });

  return (
    <main>
      <h1>Todos</h1>

      <AddTodo onAdd={(todo: NewTodo) => addMutation.mutate(todo)} />

      {isPending && <p>Loading...</p>}
      {isError && <p>Something went wrong: {error.message}</p>}

      {todos?.length === 0 && <p>No todos yet.</p>}

      {todos?.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={(t) => toggleMutation.mutate(t)}
          onDelete={(id) => deleteMutation.mutate(id)}
        />
      ))}
    </main>
  );
}