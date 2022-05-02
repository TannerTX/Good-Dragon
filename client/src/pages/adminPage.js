import React, { useEffect, useState } from "react";
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import "../assets/styles/adminPage2.css"
import AcctManagement from "../Components/AdminPage/AcctManagement.js"
import Discount from "../Components/AdminPage/Discounts.js"
import ProductManagement from "../Components/AdminPage/ProductManagement.js"
import OrderHistory from "../Components/AdminPage/OrderHistory.js"

import bg from '../assets/videos/dog4.jpg'


function Admin() {

    const [portal, setPortal] = useState("")
    const [loginStatus, setLoginStatus] = useState({})
    const [usableImages, setUsableImages] = useState([])
    const history = useNavigate()

    const importAll = (r) => {
        return r.keys().map(r);
      }

    useEffect(() => {
        setUsableImages( importAll(require.context('../assets/images', false, /\.(png|jpe?g|svg)$/)) )
    }, [])

    useEffect(() => {
        Axios.get("https://good-dragon.herokuapp.com/login").then(response => {    
            if(response.data.loggedIn === true) 
            setLoginStatus(response.data.user[0])
             })
    }, [])


    return (

        <>
        { loginStatus.isAdmin && 

        <div className="mainContainer">
            <img src = {bg} class="center fade-in-image" />
        <div className="buttonNavContainer">
            <button onClick={() => setPortal("Accounts")}>Account Management</button>
            <button onClick={() => setPortal("Products")}>Product Management</button>
            <button onClick={() => setPortal("Discounts")}>Discount Codes</button>
            <button onClick={() => setPortal("History")}>Order History</button>
        </div>

        <div className="portalComponents">

            { portal=="Accounts" &&
                <AcctManagement />
            }
            
            { portal == "Products" &&
                <ProductManagement imgs={usableImages} />
            }

            { portal == "Discounts" &&
                <Discount />
            }

            { portal == "History" &&
                <OrderHistory />
            }



        </div>


        </div>
        }
        { loginStatus.isAdmin === 0 &&
            history("/")
        } 

        </>

    );

}

export default Admin;