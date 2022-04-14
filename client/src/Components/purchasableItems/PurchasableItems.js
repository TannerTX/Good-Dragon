import React from "react"


function PurchasableItems(props) {
    
    return(
        <div>

            {props.items.map( (item, value) => 
            <div style={{paddingBottom: "20px"}}> 
                <h1 style={{color: "red"}}>{item.itemName} | ID: {item.itemID}</h1>
                <h2>{item.description}</h2>
                <h3 style={{color: "green"}}><i>${item.itemPrice}</i></h3>
                <h5>Available Quantity: {item.availableQuantity}</h5>
             </div> )}

        </div>
    )
}
export default PurchasableItems