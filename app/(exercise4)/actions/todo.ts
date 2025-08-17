"use server";
import { revalidatePath } from "next/cache";
import { createTodo, fetchTodoById, updateTodo } from "../lib/todo";
import { Priority } from "../types/todo";
import { redirect } from "next/navigation";
export async function createTodoAction(
  prevState: { message: string; error: string },
  formData: FormData
) {
  const title = formData.get("title") as string;
  const priorityInput = (formData.get("priority") as string) || Priority.MEDIUM;
  if (!title || title.trim() === "") {
    return { message: "", error: "Title is required" };
  }

  const todoId = await createTodo({
    title,
    completed: false,
    priority: priorityInput as Priority,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  if (!todoId) {
    return { message: "", error: "Failed to create todo" };
  }
  revalidatePath("/todo");
  redirect("/todo");
  return { message: "Todo created successfully", error: "" };
}
export async function updateTodoAction(prevState: { message: string; error: string }, formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const priorityInput = (formData.get("priority") as string) || Priority.MEDIUM;
  if (!id) {
    return { message: "", error: "ID is required" };
  }
  if (!title || title.trim() === "") {
    return { message: "", error: "Title is required" };
  }
  const existTodo = await fetchTodoById(id);
  if (!existTodo) {
    return { message: "", error: "Todo not found" };
  }
  const update = await updateTodo(id, {
    title,
    completed: false,
    priority: priorityInput as Priority,
  });
  if (!update) {
    return { message: "", error: "Failed to update todo" };
  }
  revalidatePath("/todo");
  redirect("/todo");
  return { message: "Todo updated successfully", error: "" };
}
// app/(exercise4)/lib/actions.ts
import { ObjectId } from 'mongodb';
import { getTodoCollection } from "../lib/db";

export async function multiDeleteTodos(ids: string[]) {
  try {
    const collection = await getTodoCollection();
    const result = await collection.deleteMany({
      _id: { $in: ids.map(id => new ObjectId(id)) },
    });
    revalidatePath("/todo");
    return result.deletedCount || 0;
  } catch (error) {
    console.error('Error deleting todos:', error);
    return 0;
  }
}
export async function multiCompleteTodos(ids: string[],completed:boolean) {
  try {
    const collection = await getTodoCollection();
    const result = await collection.updateMany(
      { _id: { $in: ids.map(id => new ObjectId(id)) } },
      { $set: { completed} }
    );
    revalidatePath("/todo");
    return result.modifiedCount || 0;
  } catch (error) {
    console.error('Error completing todos:', error);
    return 0;
  }
}
export async function searchTodos(query: string) {
  try {
    const collection = await getTodoCollection();
    const regex = new RegExp(query, 'i'); 
    const todos = await collection.find({ title: regex }).toArray();
    return todos.map(todo => ({
      _id: todo._id.toString(),
      title: todo.title,
      completed: todo.completed,
      priority: todo.priority,
      createdAt: todo.createdAt || new Date().toISOString(),
      updatedAt: todo.updatedAt || new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error searching todos:', error);
    return [];
  }
}