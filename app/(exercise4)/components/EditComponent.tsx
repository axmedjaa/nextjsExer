"use client";
import { useActionState } from "react";
import Link from "next/link";
import { updateTodoAction } from "../actions/todo";
import { Todo } from "../types/todo";
;

const initialState = {
  message: "",
  error: "",
};

export default function EditTodoForm({ todo }: { todo: Todo }) {
  const [state, formAction] = useActionState(updateTodoAction, initialState);

  return (
    <div className="max-w-md mx-auto mt-10 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Todo</h1>
        <Link
          className="text-rose-600 hover:text-rose-800 transition-colors"
          href="/"
        >
          ← Back to Todos
        </Link>
      </div>

      <form action={formAction}>
        <input type="hidden" name="id" value={todo._id} />
        <input
          type="text"
          name="title"
          defaultValue={todo.title}
          placeholder="Title"
          className="border border-gray-300 rounded-md p-2 mb-4 w-full"
        />
        <select
          name="priority"
          defaultValue={todo.priority}
          className="border border-gray-300 rounded-md p-2 mb-4 w-full"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div className="flex gap-3">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Update Todo
          </button>
          <Link
            href="/todo"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>

      {state.error && <p className="text-red-500 mt-2">{state.error}</p>}
      {state.message && <p className="text-green-500 mt-2">{state.message}</p>}
    </div>
  );
}
