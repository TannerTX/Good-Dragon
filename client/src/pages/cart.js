import React, { useState, useEffect } from "react"
import Axios from "axios"
import { AiFillCodeSandboxSquare } from "react-icons/ai";


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

    viewData() {
        console.log(this.state.newCart)
    }



    
 render(){
     
    return(
        <div>
            ITEMS
            {this.viewData()}
        </div>
        )
    }

}