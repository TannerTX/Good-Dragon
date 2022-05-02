import React, { useState, useEffect } from "react"
import Axios from "axios"
import "./modal.css"
import { useNavigate } from "react-router-dom"
import { AiFillPropertySafety } from "react-icons/ai"
import {base_url} from "../AdminPage/config.js"

export default function Dropbox(props) {

    const showState = () => {
        console.log(props.state.currentState)
    }

    const [itemName, setItemName] = useState(props.item.itemName)
    const [description, setDescription] = useState(props.item.description)
    const [price, setPrice] = useState(props.item.itemPrice)
    const [available, setAvailable] = useState(props.item.availableQuantity)
    const [age, setAge] = useState(props.item.age)
    const [pedigree, setPedigree] = useState(props.item.pedigree)
    const [sale, setSale] = useState(props.item.sale)
    const [rand, setRand] = useState(0)
    const history = useNavigate()

    const handleChangeSubmit = () => {
        setRand(Math.floor(Math.random() * 100))

        let id = props.item.itemID
        Axios.post(`${base_url}/updateItem`, {data: {itemName, id, description, price, available, age, pedigree, sale} }).then(res => {
            console.log(res)
            alert("Successfully Updated!")
            swapShop()
            props.rand(5)
        })


    }

    const swapShop = () => {
        history("/shop")
    }


    const handleDelete = () => {
        setRand(Math.floor(Math.random() * 100))
        let id = props.item.itemID
        Axios.post(`${base_url}/deleteItem`, {id: id}).then(res => {
            console.log(res)
            alert("Success!")
            swapShop()
        })
    }

    useEffect(() => {
        setItemName(itemName)
        setDescription(description)
        setPrice(price)
        setAvailable(available)
        setAge(age)
        setPedigree(pedigree)
        setSale(sale)
    },[rand])

    return (
        <>
        { !props.adminMode && 
        <div className="dropdown-container">
            
            <div className="dropdown-header">
                <h4>{props.item.itemName}</h4>
                <img src={props.item.itemImg} alt="dogImg" class="circleBase type1"></img>
            </div>

           
           

            <div className="dropdown-body">
                <table className="body-table">
                    <tr>
                        <th>Price: </th>
                        <td>${props.item.itemPrice}</td>
                    </tr>
                    <tr>
                        <th>Available Quantity: </th>
                        <td>{props.item.availableQuantity}</td>
                    </tr>
                    {props.item.itemCategory === "Pet" &&
                    <tr>
                        <th>Age: </th>
                        <td>{props.item.age}</td>
                    </tr>
                    }
                    {props.item.itemCategory === "Pet" &&
                    <tr>
                        <th>Pedigree: </th>
                        <td>{props.item.pedigree}</td>
                    </tr>
                    }               
                    <tr>
                        <th>Description: </th>
                        <td className="description-table">{props.item.description}</td>
                    </tr>
                </table>
            </div>

            <div className="dropdown-footer">
            </div>
        </div>
        }

        { props.adminMode &&

        <div className="dropdown-container-admin">

            <div className="dropdown-header-admin">
                <h4>Modify {props.item.itemName}</h4>
                <div className="deleteButton">
                <button className="btn-admin-delete newStyle-delete" onClick={handleDelete}>Delete Item</button>
                </div>
            </div>
            <div class="img-container-admin">
                <img src={props.item.itemImg} alt="dogImg" class="circleBase-admin type1-admin"></img>
            </div>

            <div className="dropdown-body-admin">

            <div>
            <h4>Item Name</h4>
            <input placeholder="Name" defaultValue={props.item.itemName} onChange={(e) => setItemName(e.target.value)} />
            </div>    
            
            <div>
             <h4>Description</h4>
             <input id="itemDescription" defaultValue={props.item.description} placeholder="Item Description" onChange={(e) => setDescription(e.target.value)}  />
             </div>

             <div>
             <h4>Price</h4>
             <input id="priceInput" defaultValue={props.item.itemPrice} placeholder="Price" min={0} max={9999} type="number" step=".01" onChange={(e) => setPrice(parseFloat(e.target.value))} />
             </div>

             <div>
             <h4>Available Quantity</h4>
             <input id="availability" defaultValue={props.item.availableQuantity} min={0} max={9999} placeholder="Available Quantity" type="number" onChange={(e) => setAvailable(parseInt(e.target.value))} />    
             </div>

             <div>
             <h4>Age</h4>
             <input id="age" defaultValue={props.item.age} type="number" min={1} max={30} placeholder="Age" disabled={props.item.itemCategory != "Pet" ? true: false} onChange={(e) => setAge(parseInt(e.target.value))}/>
             <h4>Sale</h4>
             <input id="sale" defaultValue={props.item.sale} type="number" min={0} max={100} step="1" placeholder="Sale" onChange={(e) => setSale(parseInt(e.target.value))}/>
             </div>

             <div>
             <h4>Pedigree Type</h4>
             <input id="pedigree" defaultValue={props.item.pedigree} placeholder="Pedigree" disabled={props.item.itemCategory !="Pet" ? true: false} onChange={(e) => setPedigree(e.target.value)}  />
             </div>
                
            </div>

            <div className="dropdown-footer-admin">
                <button className="btn newStyle" onClick={handleChangeSubmit}>Submit Changes</button>
            </div>
        </div>

        }
        </>
    )
}