import React, { useState } from "react"
import "./cart.css"

function CartItem(props) {


    return(
        <div class="cardCart">
             <div class="product-card">
             <div class="badge">{props.item.itemCategory + ` ITEM ID: ${props.item.itemID}` || "NULL"}</div>
             <div class="product-tumb">
             {props.item.itemImg ? <img src={props.item.itemImg} width={200} height={200} className="prodimg" /> : <p>NO IMAGE</p>}
             </div>
                
             <div class="product-details">
             <h4><a href="">{props.item.itemName || "NULL"}</a></h4>
             <p>{props.item.description || "NULL"}</p>

             <div class="product-bottom-details">

                <div class="product-price">
                    ${props.item.itemPrice || "NULL"} X {props.item.quantity}
                </div>
                <div class="product-total">Total: ${props.item.quantity * props.item.itemPrice}</div>
                
            </div>
            </div>
            </div>
            </div>
    )

}
export default CartItem