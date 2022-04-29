import React, { useState, useEffect } from "react"
import Axios from "axios"
import "./Discounts.css"

function Discount() {

    const [code, setCode] = useState("")
    const [percentOff, setPercentOff] = useState("")
    const [currCodes, setCurrCodes] = useState([])

    const addDiscountCode = () => {

        Axios.post("http://localhost:3001/discountCodes", {function: "add", disCode: code, disOff: percentOff}).then(res => {
            if(res.success)
            alert("Success!")
        })
        setCode(2)
    }


    useEffect(() => {
        Axios.post("http://localhost:3001/discountCodes", {function: "get"}).then(res => {setCurrCodes(res.data)})
        
    }, [code])

    return (

        <>
        <div className="CreateDiscountContainer">
            <h2>Create a Discount Code</h2>
            <input className="discountInput" type="text" placeholder="Discount Code" onChange={(e) => setCode(e.target.value)} />
            <input className="discountInput" type="number" placeholder="Discount" max={100} min={0} onChange={(e) => {
                if(e.target.value > 100)
                setPercentOff(100)
                else if(e.target.value < 0)
                setPercentOff(0)
                else setPercentOff(e.target.value)
            }} />
            <button onClick={() => addDiscountCode()}>Create Code</button>

        </div>

        <div className="DiscountCodesContainer">
            <h2>Active Discount Codes</h2>
            
            {currCodes.map((item) => <h3>{item.codes} - %{item.discount}</h3>)}


            <div className="DiscountCodes">

            </div>
        </div>

        </>

    )

}
export default Discount