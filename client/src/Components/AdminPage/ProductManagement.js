import React, { useState, useEffect } from "react"
import Axios from "axios"
import "./ProductManagement.css"
import { Dropdown, Selection } from "react-dropdown-now"



function ProductManagement(props) {
    const [itemName, setItemName] = useState("")
    const [itemID, setItemID] = useState(0)
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [available, setAvailable] = useState(0)
    const [image, setImage] = useState("")
    const [category, setCategory] = useState("")

    // Some items cant have these
    const [age, setAge] = useState(0)
    const [pedigree, setPedigree] = useState("")

    return (
        <>
        <div className="addProductContainer">
            <h2>Create New Product</h2>
        </div>

        <div className="newProductInfoContainer">
        <Dropdown
        placeholder="Category" 
        className="dropdown_menu"
        options={["Pet", "Accessory", "Service"]}
        onChange={(e) => setCategory(e.value)}
        />  
        <input id="itemName" placeholder="Item name" onChange={(e) => setItemName(e.target.value)} />

        <div id="imgScroller">
         { props.imgs.map(img => 
         <span onClick={() => setImage(img)}>
            <div className="imgSc">
            <img className="imgS" src={img} />
            </div>
        </span>
         )
         }  
        </div>

        <div>
        <input id="itemDescription" placeholder="Item Description" onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div>
        <input id="priceInput" placeholder="Price" min={0} max={9999} type="number" step=".01" onChange={(e) => setPrice(e.target.value)} />
        </div>

        <div>
        <input id="availability" min={0} max={9999} placeholder="Available Quantity" type="number" onChange={(e) => setAvailable(e.target.value)} />    
        </div>
        
        <div id="imgPreview">
        <img src={image} width={200} height={200}></img>
        <h3>Image Preview</h3>
        </div>


        <button>Submit</button>
        </div>
        </>
    );
}

export default ProductManagement