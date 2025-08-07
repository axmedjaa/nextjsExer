import React from 'react'
interface user{
    params:{
        username:string
    }
}
const userDetail = ({params}:user) => {
  return (
    <div>
        <h1>welcome {params.username}</h1>
    </div>
  )
}

export default userDetail