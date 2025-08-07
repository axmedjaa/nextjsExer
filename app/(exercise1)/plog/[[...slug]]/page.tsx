import React from 'react'
interface plog{
    params:{
        slug:string[]
    }
}
const plogPage = ({params}:plog) => {
  return (
    <div>
        <h1>{`You visited plog/ ${params.slug.join("/")}`}</h1>
    </div>
  )
}

export default plogPage