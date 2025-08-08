import React from 'react'

const page = () => {
    const newDate=new Date().toLocaleTimeString()
  return (
    <div>
        <p>current time: {newDate}</p>
    </div>
  )
}

export default page