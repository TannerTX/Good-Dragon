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

        
        if( category === "Pet" && ( itemName === "" || description === "" || price === null || available === null || image === null || category === "" || age === null || pedigree === "" || sale === "") )
        alert("No Empty Fields!")
        else if(category != "Pet" && ( itemName === "" || description === "" || price === null || available === null || image === null || category === "" || sale === "") )
        alert("No Empty Fields!")
        else {

        Axios.post("https://good-dragon.herokuapp.com/getMaxID").then(res => {
            console.log(res.data[0].maxItemID)
            let max = res.data[0].maxItemID + 1
            let isAge = parseInt(age) || null
            let isPedigree = pedigree || null
            
            console.log({itemName, max, description, price, available, image, category, age, isPedigree, sale})

            Axios.post("https://good-dragon.herokuapp.com/addItem",{data: {itemName, id: max, description, price, available, image, category, isAge, isPedigree, sale} }).then(result => {
                console.log(result)
                alert("Successfully added item!")
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
        setSale(sale)
    }, [image])


    return (
        <>
        <div className="addProductContainer">
            <h2>Create New Product</h2>
        </div>

        <div className="newProductInfoContainer">

        <select id="selector" onChange={(e) => setCategory(e.target.value)}>
        <option>Pet</option>
        <option>Accessory</option>
        <option>Service</option>    
        </select> 

        <div class = "1">
        <input id="itemName" placeholder="Item name" onChange={(e) => setItemName(e.target.value)} />
        </div>
        <div id="imgScroller">
         { props.imgs.map(img => 
         <span className="sp" onClick={() => setImage(img)}>
            <div className="imgSc">
            <img className="imgS" src={img} />
            </div>
        </span>
         )
         }  
        </div>

        <div class = "2">
        <input id="itemDescription" placeholder="Item Description" onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div class = "3">
        <input id="priceInput" placeholder="Price" min={0} max={9999} type="number" step=".01" onChange={(e) => setPrice(parseFloat(e.target.value))} />
        </div>

        <div class = "4">
        <input id="availability" min={0} max={9999} placeholder="Available Units" type="number" onChange={(e) => setAvailable(parseInt(e.target.value))} />    
        </div>

        <div id="imgPreview">
        <img src={image} width={200} height={200}></img>
        <h3>Image Preview</h3>
        </div>

        <div class = "5">
        <input id="age" type="number" min={1} max={30} placeholder="Age" onChange={(e) => setAge(parseInt(e.target.value))} disabled={(category === "Service" || category === "Accessory") ? true:false}/>
        <input id="sale" type="number" min={0} max={100} placeholder="Sale" onChange={(e) => setSale(parseInt(e.target.value))}/>
        </div>

        <div class = "5">
        <input id="pedigree" placeholder="Pedigree" onChange={(e) => setPedigree(e.target.value)} disabled={(category === "Service" || category === "Accessory") ? true:false} />
        </div>


        <button onClick={submitItem}>Submit</button>
        </div>
        </>
    );
}

export default ProductManagement