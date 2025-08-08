import React from 'react'

const SlowCompenent = async() => {
    await new Promise((resolve)=>setTimeout(resolve,3000))
  return (
    <div>SlowCompenent</div>
  )
}

export default SlowCompenent