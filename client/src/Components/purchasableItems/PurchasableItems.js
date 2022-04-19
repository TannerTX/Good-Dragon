import React, { useState, useEffect } from "react"
import * as FaIcons from "react-icons/fa"
import "./productCard.css"
import Axios from "axios"


function PurchasableItems(props) {
    
    Axios.defaults.withCredentials = true
    let width, height = "200px"
    
    const [itemQuant, setItemQuant] = useState(props.item.availableQuantity)


    const addToCart = async item => {

        props.cart.push(item)
        setItemQuant(itemQuant - 1)
        
        console.log(props.cart)
        let data = {item: props.item, user: props.currUser}
        await Axios.post("http://localhost:3001/addToCart", data).then(response => console.log(response))
        window.location.reload(false)
    }

    return(
            <div class="card">
             <div class="product-card">
             <div class="badge">{props.item.itemCategory || "NULL"}</div>
             <div class="product-tumb">
             {props.item.itemImg ? <img src={props.item.itemImg} width={width} height={height} className="prodimg" /> : <p>NO IMAGE</p>}
             </div>
                
             <div class="product-details">
             <h4><a href="">{props.item.itemName || "NULL"}</a></h4>
             <p>{props.item.description || "NULL"}</p>
             <h6 className="itemQuant">Available: {itemQuant || "0"}</h6>

             <div class="product-bottom-details">

                <div class="product-price">${props.item.itemPrice || "NULL"}</div>
                <div class="product-links">
                    {itemQuant > 0 ?
                    <>
                    <button class="specialbutton" onClick={() => addToCart(props.item)}><FaIcons.FaShoppingCart /></button>
                    </>
                    :
                    <p style={{color: "red"}}>OUT OF STOCK</p>
                    }
                </div>

            </div>
            </div>
            </div>
            </div>
    )
}
export default PurchasableItems