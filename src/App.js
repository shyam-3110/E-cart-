import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Products from './components/Products';
import Filter from './components/filter'
import Basket from './components/basket';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      products:[],
      filteredsProducts:[],
      cartItems:[],
    };
    
  }
  componentWillMount(){
    fetch("http://localhost:8000/products/").then(res => res.json()).then(data => this.setState({
      products: data,
      filteredsProducts: data,
    }));

    // if(localStorage.getItem('cartItems')){
    //   this.setState({cartItems: JSON.parse(localStorage.getItem('cartItem'))});
    // }
  }

  handleChnageSort=(e) =>  {
    this.setState({sort: e.target.value});
    this.listProducts();
  }

  listProducts(){
    this.setState(state => {
      if(state.sort !==""){
        state.products.sort( (a,b) => (state.sort === "lowest")?(a.price > b.price ?1:-1 ):(a.price < b.price ?1:-1 ))
      }
      else{
        state.products.sort((a,b) => (a.id < b.id)?1:-1);
      }
      return {filteredsProducts: state.products}
    })
  }

  handleAddtoCart=(e,product) => {
    console.log("before")
    
    this.setState(state =>{
      const cartItems = state.cartItems;
      console.log(cartItems)
      let productAleredyInCart=false;
      cartItems.forEach(item => {
        if (item.id === product.id){
          productAleredyInCart= true;
          console.log("true");
          item.count+=1;
        }
      });
      if(!productAleredyInCart){
        console.log("true not already in cart")
        cartItems.push({...product,count:1});
        console.log(cartItems);
      }
      localStorage.setItem("cartItems",JSON.stringify(cartItems));
      return cartItems;
    })
  }

  handleRemoveFromCart=(e,item) => {
    this.setState(state=>{
      const cartItems= state.cartItems.filter(elm => elm.id !=item.id);
      return {cartItems};
    });
  }
  render(){
    return (
      <div className="container">
        <h1>E-cart</h1>
        <hr/>
        <div className="row">
          <div className="col-md-8">
            <Filter sort={this.state.sort} handleChnageSort={this.handleChnageSort} count= {this.state.filteredsProducts.length} />
            <hr/>
            <Products products={this.state.filteredsProducts} handleAddtoCart={this.handleAddtoCart}/>
          </div>
          <div className="col-md-4">
            <Basket cartItems={this.state.cartItems} handleRemoveFromCart={this.handleRemoveFromCart}></Basket>
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
