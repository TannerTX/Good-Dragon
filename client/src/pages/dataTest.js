import React, { useState } from "react"
import Axios from "axios"
import "./Login.css"
import PurchasableItems from "../Components/purchasableItems/PurchasableItems.js"




function DataTest() {

    const [items, setItems] = useState({})
    const [submit, setSubmit] = useState("")

    const getData = async e => {
        e.preventDefault()
        const response = await Axios.post("http://localhost:3001/getData").then(res => {setItems(res.data); console.log(items)})
        setSubmit(true)
    }

    const loadshit = (isSubmit) => {
        if(isSubmit)
        return <PurchasableItems isSubmit={submit} items={items} />
    }
    

    return(
        <div>
        <button className="cssbuttons-io-button" onClick={getData}>yes</button>
        {loadshit(submit)}
        </div>
        )

}
export default DataTest