import React, { useState } from "react"
import Axios from "axios"
import CartItem from "../Components/cartItem/cartItem.js"

export default class Cart extends React.Component {
    
    constructor(props){
        super(props);
        Axios.defaults.withCredentials = true
        this.state = {
            cart: [{}],
            currentUser: [{}],
            
        }
    }

    componentDidMount() {
    
        Axios.get("http://localhost:3001/login").then(response => {    
            if(response.data.loggedIn === true) 
            this.state.currentUser = response.data.user[0]
            
            Axios.post("http://localhost:3001/getUserCart", {user: this.state.currentUser}).then(res => {
                
                this.setState({cart: res.data});
                console.log(this.state.cart)

             })
            
        })  
        
    }

    getCart() {
        return this.state.cart
    }

    
 render(){
     
    return(
        <>
        <div className="cardsContainer">

        <div className="cardsCart">
            {this.state.cart.map(item => <div><CartItem item={item} /></div> )}

            <div className="checkoutInfo">
            <h3>Checkout</h3>

            <div className="checkoutItems">
            {this.state.cart.map(item =>

            
            <div style={{padding: "1px"}}> 
            <h5 className="checkoutItemCard">{item.quantity} x {item.itemName}:  <p>${item.quantity * item.itemPrice}</p></h5>
            
            </div>
            

            )}
            </div>

            </div>
        </div>

        

        </div>

        
        </>
        )
    }

}