import React, { Suspense } from 'react'
import Counter from '../components/Counter'
import SlowCompenent from '../components/SlowCompenent'
const page = async() => {
    const res=await fetch("https://dummyjson.com/products")
    const data=await res.json()
  return (
    <div>
        <h1>products</h1>
        <ul>
            {
                data.products.slice(0,5).map((product:any)=>(
                    <li key={product.id}>{product.title}</li>
                ))
            }
        </ul>
        <Counter/>
        <Suspense fallback={<p>loading...</p>}>
            <SlowCompenent/>
        </Suspense>
    </div>
  )
}

export default page