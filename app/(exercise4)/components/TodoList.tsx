'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { multiCompleteTodos, multiDeleteTodos, searchTodos } from '../actions/todo';
type Todo = {
  _id: string;
  title: string;
  completed: boolean;
  priority: string;
};
const TodoList = ({ todos }: { todos:Todo[]}) => {
    const [selectedTodos, setSelectedTodos] = React.useState<string[]>([]);
    const [isSelectOn, setIsSelectOn] = useState(false);
    const[search,setSearch]=useState('')
    const[filtersTodos,setFiltersTodos]=useState<Todo[]>(todos)
    const handleMultiDelete = async () => {
        setIsSelectOn(true)
        if (selectedTodos.length === 0) {
            alert("Please select todos to delete");
            return;
        }
        const deletedmulti=await multiDeleteTodos(selectedTodos);
        if (deletedmulti) {
            alert("Todos deleted successfully");
            setSelectedTodos([]);
            setIsSelectOn(false);
        } else {
            alert("Failed to delete todos");
        }
    }
    const handleMultiComplete = async () => {
        setIsSelectOn(true)
        if(!selectedTodos.length) {
            alert("Please select todos to complete");
            return;
        }
        const status=todos.some(todo => todo.completed);
        const completedCount = await multiCompleteTodos(selectedTodos, !status);
        if (completedCount) {
            alert("Todos completed successfully");
            setSelectedTodos([]);
            setIsSelectOn(false);
        } else {
            alert("Failed to complete todos");
        }
    }
   
    const handleSearch= async(value:string)=>{
        setSearch(value);
        if(value.trim() === '') {
            setFiltersTodos(todos);
            return;
        }
        const result=await searchTodos(value);
        setFiltersTodos(result);
    }
    
  return (
    <div>
        <div className='mb-6 flex gap-2 justify-between items-center'>
            <Link href="/new" className='inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'> ➕ Add New Todo</Link>
            {
                isSelectOn && (
                    <button onClick={() => setIsSelectOn(false)} className='inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600'>cancel</button>
                )
            }
            {
                todos.length>0&&(
                    <div className='space-x-2'>
                        <button onClick={handleMultiDelete} className='inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600'>select delete</button>
                        <button onClick={handleMultiComplete} className='inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>select complete</button>
                    </div>
                )
            }
          </div>
          <div>
            <input className='border border-gray-300 rounded-md p-2'
            
            type="text" value={search} onChange={(e) => handleSearch(e.target.value)} placeholder="Search todos..." />
          </div>
          {
          filtersTodos.length===0 ? (
            <p className='text-gray-500'>No todos found</p>
          ) : (
            filtersTodos.map(todo => (
              <div key={todo._id} className='flex items-center justify-between border-b border-gray-300 py-4'>
                {isSelectOn  && (
                    <input
                        type="checkbox"
                        checked={selectedTodos.includes(todo._id)}
                        onChange={() => {
                            if (selectedTodos.includes(todo._id)) {
                                setSelectedTodos(selectedTodos.filter(id => id !== todo._id));
                            } else {
                                setSelectedTodos([...selectedTodos, todo._id]);
                            }
                        }}
                    />
                )}
                 <h2 className={`text-xl font-bold text-gray-800 ${todo.completed ? 'line-through' : ''}`}>{todo.title}</h2>
                <p className='text-sm text-gray-500'>Priority: {todo.priority}</p>
               <div className='flex items-center'>
                <Link href={`/edit/${todo._id}`} className='text-blue-500 hover:text-blue-600 mr-4'>Edit</Link>
               </div>
              </div>
            ))
          )}
    </div>
  )
}

export default TodoList