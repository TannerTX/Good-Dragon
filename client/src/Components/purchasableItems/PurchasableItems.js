import React from "react"
import * as FaIcons from "react-icons/fa"
import "./productCard.css"


function PurchasableItems(props) {
    
    let width, height = "200px"

    return(

        <>

            {props.items.map( (item, value) =>

            <div class="card">
             <div class="product-card">
             <div class="badge">{item.itemCategory}</div>
             <div class="product-tumb">
             {item.itemImg ? <img src={item.itemImg} width={width} height={height} className="prodimg" /> : <p>NO IMAGE</p>}
             </div>
                
             <div class="product-details">
             <h4><a href="">{item.itemName}</a></h4>
             <p>{item.description}</p>
             <h6 className="itemQuant">Available: {item.availableQuantity}</h6>

             <div class="product-bottom-details">

                <div class="product-price">${item.itemPrice}</div>
                <div class="product-links">
                    {item.availableQuantity > 0 ?
                    <button class="specialbutton"><FaIcons.FaShoppingCart /></button>
                    :
                    <p style={{color: "red"}}>OUT OF STOCK</p>
                    }
                </div>

            </div>
            </div>
            </div>
            </div>
              )}
        </>
    
    )
}
export default PurchasableItems