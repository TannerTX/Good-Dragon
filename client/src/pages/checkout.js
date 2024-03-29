import React, { useState, useEffect } from "react"
import { useNavigate, useHistory } from "react-router-dom"
import Axios from "axios"
import "../assets/styles/checkout.css"
import {base_url} from "../assets/config.js"


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

    const history = useNavigate()

    useState(() => {

        Axios.get(`${base_url}/login`).then(response => {    
            setCurrentUser(response.data.user[0])
            console.log("CURRENT USER")
            console.log(response.data.user[0])

        Axios.post(`${base_url}/getUserCart`, {user:response.data.user[0]}).then(res => {
            setCheckoutItems(res.data)
            console.log("ITEMS")
            console.log(res.data)

            let totalIt = 0
            let totalPr = 0
            res.data.forEach(item => {
                totalIt += item.quantity
                totalPr += (item.quantity * item.itemPrice)
                // setTotalItems(totalItems + item.quantity) 
                // setTotalPrice(totalPr + (item.quantity * item.itemPrice))
                
            })
            console.log(totalIt)
            console.log(`$${totalPr}`)
            setTotalItems(totalIt)
            setTotalPrice(totalPr)
            
            console.log(totalPrice)
        })
    })

    }, [])

    const checkDiscountCode = () => {
        let code = discountCode
        Axios.post(`${base_url}/checkDiscountCode`, {code: code}).then(res => {
            console.log(res)
            if(res.data.discount)
            setPercentOff(res.data.discount)
            else if(!res.data.discount) alert("Invalid Code!")
    })
    }

    useEffect(() => {
        setTotalItems(totalItems)
    }, [totalItems])

    useEffect(() => {
        setTotalPrice(totalPrice)
    }, [totalPrice])

    const getTotalPrice = () => {
        return totalPrice
    }

    const placeOrder = () => {
        const current = new Date();
        const date = `${current.getMonth() + 1}-${current.getDate()}-${current.getFullYear()}`
        let id

        let orderTotal = ( ((totalPrice + (totalPrice * 0.0825)).toFixed(2)) - (((totalPrice + (totalPrice * 0.0825)).toFixed(2)) * (percentOff / 100) ) ).toFixed(2)
        console.log(orderTotal)
        console.log(checkOutItems)
        console.log(date)

        let itemList = ""
        let quantityList = ""

        checkOutItems.forEach(item => {
            itemList += `${item.itemID},`
            quantityList += `${item.quantity},`
        })


            Axios.post(`${base_url}/placeOrder`, {data: {itemID: itemList, total: orderTotal, username: currentUser.username, date: date, quantity: quantityList}}).then(res => {
                console.log(res)
                
            })

        history("/checkoutSuccess")
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
                        <div className="itemNameContainer"><h2 style={{fontSize: "15px"}}>{item.itemName}</h2></div>
                        <div className="itemQuantityContainer"><h5>Quantity: {item.quantity}</h5></div>
                        <div className="itemPriceContainer"><h5>Price/Unit: <a style={{color: item.sale > 0 && "orange"}}>$
                            {   item.sale > 0 ? 
                                (item.itemPrice - (item.itemPrice * item.sale/100) ).toFixed(2)
                                :
                                item.itemPrice
                            }
                        </a></h5></div>
                        <div className="totalPrice"><h4 style={{color: "green"}}>Total Price: ${
                        item.sale > 0 ?
                        ((item.itemPrice - (item.itemPrice * item.sale/100)) * item.quantity).toFixed(2)
                        :
                        item.itemPrice * item.quantity
                        }</h4></div>
                    </div>
                </div>    
                
            )
            }
        </div>
        <div className="summary">
        <h2>Summary of Order</h2>

        <div className="Items">
            <h5>Items ({totalItems}):</h5>
            <h5>Shipping:</h5>
            <h5 style={{paddingTop: "10px"}}>Total w/o Tax:</h5>
            <h5>Estimated Tax:</h5>
        </div>

        <div className="ItemsPrice">
            <h5>${totalPrice}</h5>
            <h5>$0.00</h5>
            <hr />
            <h5 style={{paddingTop: "10px"}}>${totalPrice}</h5>
            <h5>${(totalPrice * .0825).toFixed(2)}</h5>
            
        </div>
    
        <div className="Total">
        <hr className="longHR" />
        { percentOff &&
         <p>Discount: %{percentOff}</p>
        }
        <h2>Order Total: </h2>
        </div>

        <div className="TotalPrice">
            <h2 style={{textDecoration: percentOff > 0 && "line-through"}}>${( ((totalPrice + (totalPrice * 0.0825)).toFixed(2)))}</h2>
            { percentOff > 0 &&
            <h2 style={{paddingTop: "25px", color: "green"}}>${( ((totalPrice + (totalPrice * 0.0825)).toFixed(2)) - (((totalPrice + (totalPrice * 0.0825)).toFixed(2)) * (percentOff / 100) ) ).toFixed(2)}</h2> 
            }
        </div>

        <div className="CheckoutButtons">
        <input className="userInfoInputCheckout" placeholder="Discount Code" onChange={(e) => setDiscountCode(e.target.value)}/>
        <button className="checkoutbtn" onClick={checkDiscountCode}>Add Discount</button>
        </div>

        <div className="placeOrder">
        <button className="checkoutbtn" onClick={placeOrder}>Place Order</button>
        </div>

        </div>
        </>
    )


    
}

export default Checkout