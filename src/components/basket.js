import React, { Component } from 'react'
import util from '../util'
export default class basket extends Component {
    render() {
        const { cartItems } = this.props;
        console.log(cartItems)
        return (
            <div className="alert alert-info">
                {cartItems.length === 0? ("Basket is Empty") : (<div> You Have {cartItems.length} Products in the Basket </div>) }
                { cartItems.length > 0 && 
                    <div>
                        <ul>
                            {cartItems.map(items => 
                                <li key={items.id}>
                                    <b>{items.title} X {items.count} = {items.price * items.count}</b>
                                    <button className="btn btn-danger" onClick={(e) => this.props.handleRemoveFromCart(e,items)}>X</button>
                                </li>
                            )}
                        </ul>
                        Total {util.formatCurrency(cartItems.reduce((a,c) => a + c.price*c.count,0))}
                        <button className="btn btn-primary" onClick={()=>alert("Checkout needs to implement...")}>Checkout</button>
                    </div>

                }
                
            </div>

        )
    }
}
