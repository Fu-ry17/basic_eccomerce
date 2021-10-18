import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'

export default function Products() {
    const state = useContext(GlobalState)
    const [products] = state.productApi.products
    const addToCart = state.productApi.addToCart

    return (
        <div className="max-w-4xl m-auto px-4 sm:px-0">
            <h1 className="py-4 text-lg sm:text-3xl text-center font-black"> Shop </h1>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-8">
                {
                    products.map(product => (
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
                                <button onClick={()=> addToCart(product)} className="border border-gray-900 text-gray-900 text-sm px-4 rounded-md 
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
