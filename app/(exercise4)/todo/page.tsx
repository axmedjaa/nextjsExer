import React from 'react'
import { fetchTodo } from '../lib/todo';
import TodoList from '../components/TodoList';

const homePage = async () => {
    const todos=await fetchTodo()
    const time = new Date().toLocaleTimeString();
  return (
    <div className='max-w-4xl mx-auto mt-10 p-6 '>
        <div className='bg-white shadow-md rounded-lg p-6'>
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>📝 todo app</h1>
            <p className='text-sm text-gray-500 mb-4'>Current time: {time}</p>
            <TodoList todos={todos} />
        </div>
    </div>
  )
}

export default homePage