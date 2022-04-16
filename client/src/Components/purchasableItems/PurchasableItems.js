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
             <div class="badge">Hot</div>

             <div class="product-tumb">
             {item.itemImg ? <img src={item.itemImg} width={width} height={height} className="prodimg" /> : <p>NO IMAGE</p>}
             </div>

             <div class="product-details">
             <span class="product-catagory">Pet</span>

             <h4><a href="">{item.itemName}</a></h4>
             <p>{item.description}</p>

             <div class="product-bottom-details">

                <div class="product-price">${item.itemPrice}</div>
                <div class="product-links">
                    <button class="specialbutton"><FaIcons.FaShoppingCart /></button>
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