import React from "react"
import { useNavigate } from "react-router-dom"
import "../assets/styles/checkoutSuccess.css"
import fire from "../assets/images/logos/fire.png"

function CheckoutSuccess() {

    const history = useNavigate()

    return(
        <div className="success">
                <h1>Order has been Placed!</h1>
                <img src={fire} width={200} height={200}/>
                <button onClick={() => history("/shop")}>Continue Shopping</button>
            </div>
    )


}

export default CheckoutSuccess