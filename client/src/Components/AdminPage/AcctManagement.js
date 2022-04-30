import React, {useEffect, useState} from "react"
import "./AcctManagement.css"
import Axios from "axios"



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
    const [placedOrders, setPlacedOrders] = useState([])
    const [rand, setRand] = useState(0)

    const handleUserSearch = () => {

        Axios.post("http://localhost:3001/getUserInfo", {user:userSearch}).then(res => {
            if(res.data[0].username) {
                console.log(res.data[0])
                setFoundUser(res.data[0])
                setUsername(foundUser.username)
                setName(`${foundUser.firstName} ${foundUser.lastName}`)
                setEmail(foundUser.email)
                setIsAdmin(foundUser.isAdmin)
                setAddress(foundUser.address)
                setOldPassword(foundUser.password)
                setPhone(foundUser.phoneNum)

                Axios.post("http://localhost:3001/getUserOrders", {user:foundUser.username}).then(res => {
                    if(res.data[0]) 
                    setPlacedOrders(res.data[0])
                    
                    else if(!res.data[0])
                    setPlacedOrders(null)
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
        console.log(placedOrders)
    }

    useEffect(() => {
        setFoundUser(foundUser)
        setUsername(foundUser.username)
                setEmail(foundUser.email)
                setIsAdmin(foundUser.isAdmin)
                setAddress(foundUser.address)
                setOldPassword(foundUser.password)
                setPhone(foundUser.phoneNum)
    }, [rand])

    const handleChangeSubmit = () => {

        let oldUser = foundUser.username
        console.log(isAdmin)
        let first = name.split(" ")[0]
        let last = name.split(" ")[1]

        let newUserInfo = {oldUser, username, isAdmin, oldPassword, newPassword, first, last, address, email, phone}
        Axios.post("http://localhost:3001/updateUserInfo", {userInfo: newUserInfo}).then(res => {
            console.log(res)

            if(res.data.errorMessage)
            alert("Username already exists, choose another")
            else if(!res.data.errorMessage) alert("Success!")
        })
        

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
        {  
            <p className="placedOrder">
                
            </p>
        }
        {  
            <p className="noOrders">NO ORDERS</p>
        }
        </div>
        </>
    )


}

export default AcctManagement