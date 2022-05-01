import React, { useState, useEffect } from "react"
import Axios from "axios"
import CartItem from "../Components/cartItem/cartItem.js"
import * as AiIcons from "react-icons/ai"

export default function Cart() {
    
    const [cart, setCart] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [subTotal, setSubTotal] = useState(0.0)
    const [numItems, setNumItems] = useState(0)
    const [deleteMap, setDeleteMap] = useState(new Map())
    const updateDeleteMap = (k, v) => {
        setDeleteMap(deleteMap.set(k, v))
    }

    Axios.defaults.withCredentials = true
    
    useEffect(() => {
    
        Axios.get("http://localhost:3001/login").then(response => {    
            console.log(response)
            if(response.data.loggedIn === true) 
            setCurrentUser(response.data.user[0])
            
            Axios.post("http://localhost:3001/getUserCart", {user: response.data.user[0]}).then(res => {
                
                setCart(res.data);
                console.log(cart)
                
                var total = 0
                var totalNumItems = 0
                res.data.forEach(item => { 
                    totalNumItems += item.quantity
                    total += (item.quantity * item.itemPrice)
                 })
                setSubTotal(total)
                setNumItems(totalNumItems)
             })
            
        })  
        
    }, [subTotal])

    useEffect(() => {setCart(cart)}, [cart])

    useEffect(() => {
        setSubTotal(subTotal)
        setNumItems(numItems)
    }, [subTotal])


    const getCart = () => {
        return cart
    }

    const handleCartItemRemove = (itemName, itemID) => {

        let numToDelete = deleteMap.get(itemName) || 1
        console.log(`${itemName}, ${numToDelete}`)
        
        Axios.post("http://localhost:3001/removeFromCart", {currentUser, itemName, itemID, numToDelete}).then(res => {
            console.log(res)
        })

        setSubTotal(1)
        console.log(cart)
        
    }
     
    return(
        <>
        { cart.length > 0 && 
        <>
        <div className="cardsContainer">

        <div className="cardsCart">
            {cart.map(item => <div><CartItem item={item} /></div> )}
        </div>
        </div>

        <div className="checkoutInfo">
            <h3 style={{paddingTop: "10px", paddingBottom: "5px"}}>Checkout</h3>

            <div className="checkoutItems">
            {cart.map(item =>
            
            <div style={{padding: "1px"}}> 
            <h5 className="checkoutItemCard">
                {item.quantity} x {item.itemName}:  <p>${item.quantity * item.itemPrice}</p>
                <div className="itemRemove">

                    <input type="number" defaultValue={1} max={item.quantity} min={1} onChange={(e) => {
                        if(e.target.value > item.quantity)
                        updateDeleteMap(item.itemName, item.quantity)
                        else if(e.target.value < 1)
                        updateDeleteMap(item.itemName, 1)
                        else
                        updateDeleteMap(item.itemName, e.target.value)
                    }} />

                    <a onClick={() => handleCartItemRemove(item.itemName, item.itemID)}>
                    <AiIcons.AiFillCloseSquare />
                    </a>
                </div>
            </h5>
            </div>
            )}

            


            </div>
            
            <div className="checkoutDetails">
            
            <h4>Subtotal ({numItems} items): ${subTotal % 1 == 0 ? subTotal.toLocaleString() + ".00" : subTotal.toLocaleString()}</h4>
            
            { cart.length > 0 &&
            <button>
            <span>Proceed to Checkout</span>
            <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
            </svg>
            </button>
            }
            </div>
            

            </div>
            </>
            }

            { cart.length <= 0 &&
            <div className="noItems">NO ITEMS</div>

            }
            
        </>
        )
    

}