"use client"
import React, { useActionState } from 'react'
import { createTodoAction } from '../actions/todo'
import Link from 'next/link'
const initialState={
  message: '',
  error: ''
}
const CreateTodo = () => {
  const [state,formAction]=useActionState(createTodoAction,initialState)
  return (
    <div className='max-w-md mx-auto mt-10 p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-3xl font-bold text-gray-800 mb-2'>Create Todo</h1>
         <Link className='text-rose-600 hover:text-rose-800 transition-colors' href="/"> ← Back to Todos</Link>
        </div>
        <form action={formAction}>
            <input type="text" name="title" placeholder="Title" className='border border-gray-300 rounded-md p-2 mb-4 w-full' />
            <select name="priority" className='border border-gray-300 rounded-md p-2 mb-4 w-full'>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button type="submit" className='inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>Create</button>
        </form>
        {state.error && <p className="text-red-500 mt-2">{state.error}</p>}
        {state.message && <p className="text-green-500 mt-2">{state.message}</p>}
    </div>
  )
}

export default CreateTodo