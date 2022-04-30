import React, { useState, useEffect } from "react"
import Axios from "axios"
import "./ProductManagement.css"
import { Dropdown, Selection } from "react-dropdown-now"



function ProductManagement(props) {
    const [itemName, setItemName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [available, setAvailable] = useState(0)
    const [image, setImage] = useState("")
    const [category, setCategory] = useState("")
    const [sale, setSale] = useState(0)

    // Some items cant have these
    const [age, setAge] = useState(0)
    const [pedigree, setPedigree] = useState("")

    const submitItem = () => {

        
        if( category === "Pet" && ( itemName === "" || description === "" || price === null || available === null || image === null || category === "" || age === null || pedigree === "") )
        alert("No Empty Fields!")
        else if(category != "Pet" && ( itemName === "" || description === "" || price === null || available === null || image === null || category === "") )
        alert("No Empty Fields!")
        else {

        Axios.post("http://localhost:3001/getMaxID").then(res => {
            console.log(res.data[0].maxItemID)
            let max = res.data[0].maxItemID + 1
            let isAge = age || null
            let isPedigree = pedigree || null
            
            Axios.post("http://localhost:3001/addItem", {itemName, max, description, price, available, image, category, isAge, isPedigree}).then(result => {
                console.log(result)
            })



        })
    }

    }

    useEffect(() => {
        setItemName(itemName)
        setDescription(description)
        setPrice(price)
        setAvailable(available)
        setImage(image)
        setCategory(category)
        setAge(age)
        setPedigree(pedigree)
    }, [image])


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

        <div>
        <input id="age" type="number" min={1} max={30} placeholder="Age" onChange={(e) => setAge(e.target.value)} disabled={(category === "Service" || category === "Accessory") ? true:false}/>
        </div>

        <div>
        <input id="pedigree" placeholder="Pedigree" onChange={(e) => setPedigree(e.target.value)} disabled={(category === "Service" || category === "Accessory") ? true:false} />
        </div>


        <button onClick={submitItem}>Submit</button>
        </div>
        </>
    );
}

export default ProductManagement