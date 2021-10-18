import { useEffect, useState } from 'react'
import axios from 'axios'

const URI = 'https://fakestoreapi.com/products'

export default function ProductApi() {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])

    useEffect(()=>{
       const getProducts = async () => {
            try {
                const res = await axios.get(URI)
                setProducts(res.data)

            } catch (error) {
                console.log('Err', error.message)
            }
       }

       getProducts()

    },[])
    
    useEffect(()=>{
        const data = localStorage.getItem('cart')
        const loaded = JSON.parse(data)

        if(loaded){
            setCart(loaded)
        }

    },[])

    const addToCart = (product) => {
      const check = cart.every(prod => prod.id !== product.id)

      if(check){
         setCart([...cart, {...product, quantity: 1}])

      }else{
         cart.forEach(item => {
             if(item.id === product.id){
                 item.quantity += 1
             }
         })

         setCart([...cart])
      }

    }

    useEffect(()=>{
        const data = JSON.stringify(cart)
        localStorage.setItem('cart', data)
    },[cart])

    console.log(cart)

    return {
        products: [products, setProducts],
        cart: [cart, setCart],
        addToCart: addToCart
    }
}
