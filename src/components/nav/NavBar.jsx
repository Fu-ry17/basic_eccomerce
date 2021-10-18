import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { GlobalState } from '../../GlobalState'

export default function NavBar() {
    const state = useContext(GlobalState)
    const [cart] = state.productApi.cart
    const [cartItems, setCartItems] = useState(0)
 
    useEffect(()=>{
       let total = cart.reduce((acc, item) => acc + item.quantity, 0)
       setCartItems(total)
    },[cart])


    return (
        <nav className="bg-gray-900 shadow-xl border-b border-gray-400">

            <div className="flex max-w-4xl mx-auto justify-between py-2 items-center px-4 md:px-0">

                <div>
                    <h1 className="text-2xl text-gray-200 font-bold tracking-tight"> Fury Store </h1>
                </div>

                <div>
                    <ul className="flex">
                        <li className="px-2 text-gray-200 text-sm "><NavLink to='/'> Home </NavLink></li>
                        <li className="px-2 text-gray-200 text-sm "><NavLink to='/cart'> Cart <span>{cartItems}</span> </NavLink></li>
                    </ul>
                </div>

            </div>
           
        </nav>
    )
}
