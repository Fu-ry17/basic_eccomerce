import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'

export default function ProductDetails() {
    const state = useContext(GlobalState)
    const [product, setProduct] = useState([])
    const [related, setRelated] = useState([])
    const [products] = state.productApi.products
    const addToCart = state.productApi.addToCart
    const param = useParams()
    const id = Number(param.id)

    useEffect(()=>{
      products.forEach(product => {
          if(product.id === id) setProduct(product)
      })
      
    },[products, id])

    useEffect(()=>{
        if(id){
            let relatedProducts = products.filter(prod => prod.category === product.category)
            setRelated(relatedProducts)
        }
    },[id, product, products])
    
    if(product.length === 0) return null

    return (
        <div className="max-w-4xl m-auto px-4 sm:px-0">

            <div key={product.id} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 hover:shadow-lg hover:rounded-lg">
               <div className="">
                   <img  className="w-full h-60 object-contain"src={product.image} alt={product.title}/>
               </div>
               <div className="text-left pr-4">
                   <h1 className="text-lg font-black mb-2"> {product.title} </h1>
                   <p className="text-sm text-justify tracking-tight text-gray-400"> {product.description} </p>

                   <div className="flex justify-between text-sm text-black my-2">
                       <p> Rating:  {product.rating.rate}  </p>
                       <p> Reviews: {product.rating.count} </p>
                       <p> Category: {product.category}</p>
                   </div>

                   <div className="flex justify-between mt-2">
                   <button onClick={()=>addToCart(product)} className="border border-gray-900 text-gray-900 text-sm px-4 rounded-md 
                                                                         hover:border hover:border-gray-900 hover:bg-gray-900 hover:text-gray-200 "> Buy </button>
                      <p> <span className="text-lg font-bold">$</span>{product.price}</p>
                   </div>
               </div>
            </div> 

              <h1 className="text-2xl py-4 text-bold"> Related Products </h1>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-8">
                {
                    related.map(product => (
                       <div className="shadow-md p-2 hover:shadow-xl" key={product.id}>
                            <div className="w-full sm:h-48">
                               <img className="w-full h-48 object-contain border-b border-gray-400 pb-2" src={product.image} alt={product.title} />
                            </div>
                            <div className="sm:h-8 sm:overflow-hidden">
                               <p className="text-sm text-left py-2 tracking-tight font-semibold"> {product.title} </p>
                            </div>

                            <div className="flex justify-between items-center py-2">
                                <Link to={`/p/${product.id}`} className="border border-gray-900 bg-gray-900 text-gray-200 px-4 text-sm rounded-md 
                                                                         hover:border hover:border-gray-900 hover:text-gray-900 hover:bg-white"> View </Link>
                                <button onClick={()=>addToCart(product)} className="border border-gray-900 text-gray-900 text-sm px-4 rounded-md 
                                                                         hover:border hover:border-gray-900 hover:bg-gray-900 hover:text-gray-200 "> Buy </button>
                                 <div>
                                     <p> <span className="text-lg font-bold">$</span>{product.price}</p>
                                 </div>
                            </div>
                        </div>
                    ))
                }
            </div>
           

        </div>
    )
}
