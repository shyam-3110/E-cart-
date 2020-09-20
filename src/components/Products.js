import React, { Component } from 'react'
import util from '../util'
export default class Products extends Component {
    render() {
        const productItems = this.props.products.map ( product => (
            <div className="col-md-4" key={product.id} >
                <div className="thumbnail text-contex">
                    <img src={`/products/${product.sku}.jpg`} alt={product.title} />
                    <p>
                        {product.title}
                    </p>
                    <div>
                        <b>{util.formatCurrency(product.price)}</b>
                        <button className="btn btn-default" onClick={ (e) => this.props.handleAddtoCart(e,product) }>Add to Cart</button>
                    </div>
                </div>
            </div>
        )
        )
        return (
            <div>
                {productItems}
            </div>
        )
    }
}
