import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../GlobalState'
import PaypalButton from './PaypalButton'

export default function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.productApi.cart
    const [total, setTotal] = useState(0)
    const [tax, setTax] = useState(0)
    const [grandTotal, setGrandTotal] = useState(0)

    useEffect(()=>{
      let total = cart.reduce((acc, item)=> acc + (item.quantity * item.price), 0)
      let tax = (total * 16) / 100
      let grandTotal = total + tax
       setTax(tax)
       setTotal(total)
       setGrandTotal(grandTotal)
    },[total, cart])

    const deleteItem = (id) => {
        if(window.confirm('Are you sure you want to delete?')){
            let deleteData =  cart.filter(item => item.id !== id)
            setCart(deleteData)
        }
    }

    const increment = id => {
        cart.forEach(item => {
            if(item.id === id){
                item.quantity += 1
            }
        })

        setCart([...cart])
    }    

    const decrement = id => {
        cart.forEach(item => {
            if(item.id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
    }

    const transSuccess = payment => {
        console.log(payment)
    }


    return (
        <div>
            <div className="max-w-4xl mx-auto px-2 sm:px-0">
             <h1 className="py-4 text-lg sm:text-3xl text-center font-black"> Cart </h1>

             <div className="grid grid-cols-1 sm:grid-cols-3 w-full">
                 <div className="col-span-2">
                     {
                        cart.length === 0 ? <h1 className="text-3xl font-black w-full min-h-screen text-center"> Your Cart is empty!</h1> : cart.map(prod => (
                             <div className="grid grid-cols-3 gap-6 items-center w-full border boder-gray-300 hover:shadow-lg py-1 mt-1" key={prod.id}>
                                   <div className="w-full h-24 ">
                                     <img className="w-full h-24 object-contain" src={prod.image} alt={prod.title} />
                                   </div>
                                    <div>
                                        <div className="h-8 overflow-hidden">
                                            <p className="text-sm text-left tracking-tighter py-2 tracking-tight font-semibold"> {prod.title} </p>
                                        </div>
                                        <div>
                                            <button onClick={()=>decrement(prod.id)}> - </button>  {prod.quantity} <button onClick={()=>increment(prod.id)}> + </button>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold"> <span className="text-lg font-black">$</span>{(prod.price * prod.quantity).toFixed(2)}</p>
                                        <button onClick={()=> deleteItem(prod.id)}> Remove </button>
                                    </div>

                             </div>
                         ))
                     }
                 </div>

                 <div className={cart.length === 0 ? 'hidden' : 'block w-full sm:pl-6'}>
                     <h1 className="text-xl font-bold text-center border-b border-gray-700 pb-2 mb-3"> Check Out </h1>

                     <div>
                       <p className="text-sm font-semibold pb-2"> Total :  <span className="font-black">$</span> {total.toFixed(2)}</p>

                        <p className="text-sm pb-2"> Tax : $ {tax.toFixed(2)}</p>

                       <div className="border-t border=gray-300">
                           <p className="text-lg font-bold py-2"> Subtotal : <span className="font-black">$</span> {grandTotal.toFixed(2)}</p>
                       </div>

                        <PaypalButton transSuccess={transSuccess} total={grandTotal} />

                     </div>

                 </div>
             </div>

            </div>
        </div>
    )
}
