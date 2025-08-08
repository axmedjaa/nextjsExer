"use client"
import React, { useState } from 'react'
const Counter = () => {
    const[count,setCount]=useState(0)
  return (
    <div>
        <h1>counter</h1>
        <p>{count}</p>
        <button className='bg-blue-500 p-2 text-white rounded-md' onClick={()=>setCount(count+1)}>increment</button>
    </div>
  )
}

export default Counter