import React, { useEffect, useState } from "react"
import Axios from "axios"
import "../assets/styles/Login.css"
import "../Components/purchasableItems/PurchasableItems.js"
import PurchasableItems from "../Components/purchasableItems/PurchasableItems.js"
import "../Components/purchasableItems/productCard.css"



export default class Shop extends React.Component {
    
    constructor(props){
        super(props);
        Axios.defaults.withCredentials = true
        this.state = {
            items: [{}],
            cart: [],
            currentUser: [{}]
        }
    }

    componentDidMount() {
        Axios.post("http://localhost:3001/getData").then(res => {this.setState({items: res.data}); console.log(this.state.items);})
        
        Axios.get("http://localhost:3001/login").then(response => {    
            if(response.data.loggedIn === true) 
            this.state.currentUser = response.data.user[0]
            
             })
        
    }
    
 render(){
     
    return(
        <div class="cards">
        {this.state.items.map((prod) => <PurchasableItems item={prod} cart={this.state.cart} currUser={this.state.currentUser} />)}
        </div>
        )
    }

}
