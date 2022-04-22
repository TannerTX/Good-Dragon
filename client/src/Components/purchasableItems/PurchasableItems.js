import React, { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { QuantityPicker } from "react-qty-picker"
import * as FaIcons from "react-icons/fa"
import "./productCard.css"
import Dropdown from "../Modal/Modal.js"
import "../Modal/modal.css"
import Axios from "axios"



function PurchasableItems(props) {
    
    Axios.defaults.withCredentials = true
    let width, height = "200px"
    const history = useNavigate()
    const user = props.currUser || undefined

    const [itemQuant, setItemQuant] = useState(props.item.availableQuantity)
    const [quantSelector, setQuantSelector] = useState(1)
    const [showModal, setShowModal] = useState(false)

    const addToCart = async item => {

        var actualAmount = 0
        
        if(itemQuant - quantSelector < 0) {
            actualAmount = itemQuant
            setItemQuant(0)
        }
        else if(itemQuant - quantSelector >= 0) {
            actualAmount = quantSelector
            setItemQuant(itemQuant - quantSelector)
        }
        

        props.cart.push(item)
        
        
        console.log(props.cart)
        let data = {item: props.item, user: props.currUser, amt: actualAmount}

        console.log(`ADDING ${data.amt} ${data.item.itemName}s TO ${data.user.username}'s CART`)
        await Axios.post("http://localhost:3001/addToCart", data).then(response => {console.log(response)})

    }

    useEffect(() => {
        setItemQuant(props.item.availableQuantity)
        setShowModal(showModal)
    }, [props.item.availableQuantity, showModal])

    const handleModal = async e => {
       setShowModal(!showModal)
    }

    return(
        <>
        {showModal && <Dropdown item={props.item} />}
        {showModal && <button className="btn" onClick={handleModal}>Close</button>} 
         

           <div class="card">
           <div class="product-card">

              <div class="badge"> {props.item.itemCategory || "NULL"} </div>

              <div class="product-tumb">
                 {props.item.itemImg ? <img src={props.item.itemImg} width={width} height={height} className="prodimg" /> :
                 <p>NO IMAGE</p>
                 } 
              </div>

              <div class="product-details">
                 <h4><a onClick={() => {handleModal(); console.log(`SHOWING MODAL ${showModal}`)}}>{props.item.itemName || "NULL"}</a></h4>

                 {itemQuant > 0 ?
                 <div className="qtySelect">
                    <QuantityPicker value={quantSelector} min={1} max={itemQuant} width="8rem" smooth onChange={ (e)=> {setQuantSelector(e)} } /> 
                 </div>
                 :
                 <h6 style={{paddingTop: "45px"}}></h6> }
                 <h6 className="itemQuant">Available: {itemQuant || "N/A"}</h6>
                 <div class="product-bottom-details">
                    <div class="product-price">${props.item.itemPrice || "NULL"}</div>

                    <div class="product-links">
                       {itemQuant > 0 ?
                       <>
                       <button class="specialbutton" onClick={()=>
                          addToCart(props.item)}>
                          <FaIcons.FaShoppingCart />
                       </button>
                       </> :
                       <p style={{color: "red"}}>OUT OF STOCK</p> } 
                    </div>
                 </div>
              </div>
           </div>
        </div>
   </>
    )
}
export default PurchasableItems