import React, { useEffect, useState } from "react";
import Axios from "axios"
//import "../assets/styles/adminPage.css"
import "../assets/styles/adminPage2.css"
import AcctManagement from "../Components/AdminPage/AcctManagement.js"
import Discount from "../Components/AdminPage/Discounts.js"

function Admin() {

    const [portal, setPortal] = useState("")
    const [loginStatus, setLoginStatus] = useState({})

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then(response => {    
            if(response.data.loggedIn === true) 
            setLoginStatus(response.data.user[0])
             })
    }, [])


    return (
        /*
        <div class = "box">

            <div class = "itemBox">

                <label for="items">LIST OF ITEMS</label>
                <label for="nameChange" class = "nameLabel">NAME</label>
                <label for="priceChange" class = "priceLabel">PRICE</label>
                <label for="descChange" class = "descLabel">DESCRIPTION</label>
                <br/>

                <select name="items" class = "itemDrop">
                    <optgroup label = "ITEMS">
                        <option value="placeholder">placeholders</option>
                        <option value="item1">item 1</option>
                        <option value="item2">item 2</option>
                        <option value="item3">item 3</option>
                        <option value="item4">item 4</option>
                    </optgroup>
                </select>
 
                <input type="text" name="nameChange" class = "nameChange" />
                <input type="text" name="priceChange" class = "priceChange" />
                <input type="text" name="descChange" class = "descChange" />




                    
            </div>

            <div class = "orderBox">
                <p> this is where the order query is gonna go</p>
                    
            </div>

            <div class = "userBox">
                <label for="userSearch" class = "userLabel">USERNAME</label>
                <label for="passChange" class = "passLabel"> CHANGE PASSWORD</label>
                <br/>
                <input type="text" name="userSearch" class = "userSearch" />
                <input type="text" name="passChange" class = "passChange" />
                    
                <div class = "displayUser">
                    <p> this is where i want to display the user info from the search</p>
                </div>
            </div>

            <button class = "submit">SUBMIT </button>
            <label for="DC">DISCOUNT CODE:</label><br/>
            <input type="text" name="DC" class = "discountCode" />


        </div>
        */

        <>
        { loginStatus.isAdmin ? 

        <div className="mainContainer">

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
                <div>PRODUCTS</div>
            }

            { portal == "Discounts" &&
                <Discount />
            }

            { portal == "History" &&
                <div>HISTORY</div>
            }



        </div>


        </div>

            : 
        
        <div>YOU ARE NOT AN ADMIN</div>
            

        }

        </>

    );

}

export default Admin;