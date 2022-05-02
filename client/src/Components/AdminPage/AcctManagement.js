import React, {useEffect, useState} from "react"
import "./AcctManagement.css"
import Axios from "axios"
import {base_url} from "./config.js"

function AcctManagement() {

    const [userSearch, setUserSearch] = useState("")
    const [foundUser, setFoundUser] = useState({})

    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [isAdmin, setIsAdmin] = useState(0)
    const [show, setShow] = useState(false)
    const [placedOrders, setPlacedOrders] = useState([])
    const [rand, setRand] = useState(0)
    const [orderMap, setOrderMap] = useState(new Map())
    const updateOrderMap = (k, v) => {
        setOrderMap(orderMap.set(k, v))
    }

    let map = new Map()
    const handleUserSearch = () => {

        Axios.post(`${base_url}/getUserInfo`, {user:userSearch}).then(res => {
            if(res.data[0].username) {
                console.log(res.data[0])
                setFoundUser(res.data[0])
                setUsername(res.data[0].username)
                setName(`${res.data[0].firstName} ${res.data[0].lastName}`)
                setEmail(res.data[0].email)
                setIsAdmin(res.data[0].isAdmin)
                setAddress(res.data[0].address)
                setOldPassword(res.data[0].password)
                setPhone(res.data[0].phoneNum)

                Axios.post(`${base_url}/getUserOrders`, {user: res.data[0].username}).then(res => {
                    
                if(res.data[0]) {
                    setPlacedOrders(res.data)
                    console.log("PLACED ORDERS")
                    console.log(res.data)
                }
                    //getOrders() 
                else
                    setPlacedOrders(null)
                    setShow(true)      
                    
                })

                
                setRand(1)
                setName(`${foundUser.firstName} ${foundUser.lastName}`)
            }
            else {
            setUsername("User Not Found")
            setName("User Not Found")
            setEmail("User Not Found")
            setAddress("User Not Found")
            setPhone("User Not Found")
            setPlacedOrders(null)
            console.log("USER WAS NOT FOUND")
            }

        })

    }

    useEffect(() => {
        setPlacedOrders(placedOrders)
    }, [placedOrders])

    useEffect(() => {
        setOrderMap(orderMap)
    }, [orderMap])

    const handleChangeSubmit = () => {

        let oldUser = foundUser.username
        console.log(isAdmin)
        let first = name.split(" ")[0]
        let last = name.split(" ")[1]

        let newUserInfo = {oldUser, username, isAdmin, oldPassword, newPassword, first, last, address, email, phone}
        Axios.post(`${base_url}/updateUserInfo`, {userInfo: newUserInfo}).then(res => {
            console.log(res)

            if(res.data.errorMessage)
            alert("Username already exists, choose another")
            else if(!res.data.errorMessage) alert("Success!")
        })
        

    }

    const getOrders = () => {
        console.log("ORDERS")
        console.log(placedOrders)
        return placedOrders
    }

    const getTotalItems = (item) => {
        let total = 0
        total = item.itemQuantity.substring(0, item.itemQuantity.length - 1).split(",").reduce((a, b) => parseInt(a) + parseInt(b), 0)
        return total
    }

    return(
        <>
        <div className="AcctSearchContainer">
            <form className="form__label">
            <input className="form__input" type="text" placeholder="Search for a User" onChange={e => setUserSearch(e.target.value)} />
            </form>
            
            <button className="fancybutton" onClick={() => handleUserSearch()}>SEARCH</button>
            
            
        </div>

        <div className="AcctInfoGridContainer">
        <form>
            { foundUser.username == "admin" &&
            <>
            <input type="text" className="userInfoInput" placeholder={username || "Username"} onChange={(e) => setUsername(e.target.value)} />
            <input type="text" className="userInfoInput" disabled={true} placeholder={name || "Name"} onChange={(e) => setName(e.target.value)} />
            <input type="text" className="userInfoInput" disabled={true} placeholder={email || "Email"} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" className="userInfoInput" disabled={true} placeholder={address || "Address"} onChange={(e) => setAddress(e.target.value)} />
            <input type="text" className="userInfoInput" disabled={true} placeholder={phone || "Phone"} onChange={(e) => setPhone(e.target.value)} />
            <input type="password" className="userInfoInput" disabled={true} placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} />
            </>
            }

            { foundUser.username != "admin" &&
            <>
            <input type="text" className="userInfoInput" placeholder={username || "Username"} onChange={(e) => setUsername(e.target.value)} />
            <input type="text" className="userInfoInput" placeholder={name || "Name"} onChange={(e) => setName(e.target.value)} />
            <input type="text" className="userInfoInput" placeholder={email || "Email"} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" className="userInfoInput" placeholder={address || "Address"} onChange={(e) => setAddress(e.target.value)} />
            <input type="text" className="userInfoInput" placeholder={phone || "Phone"} onChange={(e) => setPhone(e.target.value)} />
            <input type="password" className="userInfoInput" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} />
            <div class="cl-toggle-switch">
                <p>Admin?</p>
            <label class="cl-switch">
            <input type="checkbox" defaultChecked={isAdmin ? true:false} onChange={e => {
                if(e.target.checked)
                setIsAdmin(1)
                else setIsAdmin(0)
            }} />
            <span></span>
            </label>
            </div>
            </>
            }
        </form>

        { (foundUser.username != "admin" && foundUser.username != null) &&
            <button className="fancybutton" onClick={() => handleChangeSubmit()}>SUBMIT CHANGES</button>
        }
            
        </div>

        <div className="userPlacedOrders">
        { (show && !placedOrders) &&
            <p>NO ORDERS</p>
        }
        { (show && placedOrders != null)  &&

            placedOrders.map(item => 
            <div className="ITEM">
                <h5>ORDER ID: {item.orderID}</h5>
                <h5>Purchase Total: ${item.orderTotal.toLocaleString()}</h5>
                <h5>Items: {getTotalItems(item)}</h5>
                <h5>Date: {item.date}</h5>
            </div>)
        }

        </div>
        </>
    )


}

export default AcctManagement