import React from 'react'
import { Route, Switch} from 'react-router-dom'
import Cart from '../cart/Cart'
import ProductDetails from '../products/ProductDetails'
import Products from '../products/Products'

export default function Pages() {
    return (
        <div>

            <Switch>
                <Route path='/' exact component={Products}/>
                <Route path='/cart' exact component={Cart}/>
                <Route path='/p/:id' exact component={ProductDetails}/>
            </Switch>
            
        </div>
    )
}
