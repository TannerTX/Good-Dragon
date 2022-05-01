import React, { useState, useEffect } from "react"
import Axios from "axios"
import "../assets/styles/checkout.css"



function Checkout() {

    const [checkOutItems, setCheckoutItems] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [price, setPrice] = useState()
    const [totalItems, setTotalItems] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalPriceTax, setTotalPriceTax] = useState(0)
    const [discountCode, setDiscountCode] = useState("")
    const [percentOff, setPercentOff] = useState(0)
    Axios.defaults.withCredentials = true

    useState(() => {

        Axios.get("http://localhost:3001/login").then(response => {    
            setCurrentUser(response.data.user[0])
            console.log("CURRENT USER")
            console.log(response.data.user[0])

        Axios.post("http://localhost:3001/getUserCart", {user:response.data.user[0]}).then(res => {
            setCheckoutItems(res.data)
            console.log("ITEMS")
            console.log(res.data)

            res.data.forEach(item => {
                setTotalItems(totalItems + item.quantity) 
                setTotalPrice(totalPrice + (item.itemPrice * item.quantity))
            })
            
        })
    })

    }, [])

    useEffect(() => {
    }, [totalPrice])

    const getTotalPrice = () => {
        return totalPrice
    }

    return(
        <>
        <div className="checkoutContainer">
            { checkOutItems.map(item => 
                <div className="itemContainer">
                    <div className="imgContainer">
                    <img src={item.itemImg} />
                    </div>
                    <div className="priceInfoContainer">
                        <div className="itemNameContainer"><h2>{item.itemName}</h2></div>
                        <div className="itemQuantityContainer"><h3>Quantity: {item.quantity}</h3></div>
                        <div className="itemPriceContainer"><h3>Price/Unit: ${item.itemPrice}</h3></div>
                        <div className="totalPrice"><h3 style={{color: "green"}}>Total Price: ${item.itemPrice * item.quantity}</h3></div>
                    </div>
                </div>    
                
            )
            }
        </div>
        <div className="summary">
        <h2>Summary of Order</h2>

        <div className="Items">
            <h3>Items ({totalItems}):</h3>
            <h3>Shipping:</h3>
            <h3 style={{paddingTop: "10px"}}>Total w/o Tax:</h3>
            <h3>Estimated Tax:</h3>
        </div>

        <div className="ItemsPrice">
            <h3>${totalPrice}</h3>
            <h3>$0.00</h3>
            <hr />
            <h3 style={{paddingTop: "10px"}}>${totalPrice}</h3>
            <h3>${(totalPrice * .0825).toFixed(2)}</h3>
            
        </div>
    
        <div className="Total">
        <hr className="longHR" />
        <h2>Order Total: </h2>
        </div>

        <div className="TotalPrice">
            <h2>${((totalPrice + (totalPrice * 0.0825)).toFixed(2)) - (((totalPrice + (totalPrice * 0.0825)).toFixed(2)) * (percentOff / 100) )}</h2>
        </div>

        <input className="userInfoInput" placeholder="Discount Code" onChange={(e) => setDiscountCode(e.target.value)}/>
        </div>
        </>
    )


    
}

export default Checkout