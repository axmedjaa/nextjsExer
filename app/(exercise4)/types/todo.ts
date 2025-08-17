export enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high"
}
export type Todo = {
    _id: string,
    title: string,
    completed: boolean,
     priority: Priority,
     createdAt: string;
     updatedAt: string;
};
export type CreateTodoInput ={
    title: string;
    completed?: boolean;
    priority?: Priority;
    createdAt?: string;  
    updatedAt?: string;
}
export type updateTodoInput={
    title?: string;
    completed?: boolean;
    priority?: Priority;
    createdAt?: string;  
    updatedAt?: string;
}