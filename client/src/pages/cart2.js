import React, { useState, useEffect } from "react"
import Axios from "axios"
import CartItem from "../Components/cartItem/cartItem.js"
import * as AiIcons from "react-icons/ai"

export default function Cart() {
    
    const [cart, setCart] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [subTotal, setSubTotal] = useState(0.0)
    const [numDelete, setNumDelete] = useState(0)
    Axios.defaults.withCredentials = true
    
    useEffect(() => {
    
        Axios.get("http://localhost:3001/login").then(response => {    
            console.log(response)
            if(response.data.loggedIn === true) 
            setCurrentUser(response.data.user[0])
            
            Axios.post("http://localhost:3001/getUserCart", {user: response.data.user[0]}).then(res => {
                
                setCart(res.data);
                console.log(cart)
                
                let total = 0
                cart.forEach(item => total += (item.quantity * item.itemPrice))
                setSubTotal(total)

             })
            
        })  
        
    }, [])

    useEffect(() => {
        setSubTotal(subTotal)
    }, [subTotal])

    const getCart = () => {
        return cart
    }

 
     
    return(
        <>
        <div className="cardsContainer">

        <div className="cardsCart">
            {cart.map(item => <div><CartItem item={item} /></div> )}

            <div className="checkoutInfo">
            <h3 style={{paddingTop: "10px", paddingBottom: "5px"}}>Checkout</h3>

            <div className="checkoutItems">
            {cart.map(item =>
            <div style={{padding: "1px"}}> 
            <h5 className="checkoutItemCard">
                {item.quantity} x {item.itemName}:  <p>${item.quantity * item.itemPrice}</p>
                <div className="itemRemove">
                    <input type="number" max={item.quantity} min={0} />
                    <span>
                    <AiIcons.AiFillCloseSquare />
                    </span>
                </div>
            </h5>
            </div>
            )}


            </div>
            
            <div className="checkoutDetails">
            
            <h4>Subtotal: ${subTotal}</h4>
            </div>
            

            </div>
        </div>

        

        </div>

        
        </>
        )
    

}