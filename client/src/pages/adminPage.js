import React from "react";
//import "../assets/styles/adminPage.css"
import "../assets/styles/adminPage2.css"


function Admin() {

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



        <div className="mainContainer">

        <div className="buttonNavContainer">
            <button>Account Management</button>
            <button>Product Management</button>
            <button>Discount Codes</button>

            <button>Order History</button>
        </div>


        </div>

    );

}

export default Admin;