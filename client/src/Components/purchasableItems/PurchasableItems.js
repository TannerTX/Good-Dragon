import React from "react"


function PurchasableItems(props) {
    
    return(
        <div>
            {props.items.map((key, value) => <div> <h1>{key.username}</h1> <h2>{value}</h2> </div>)}
        </div>
    )
}
export default PurchasableItems