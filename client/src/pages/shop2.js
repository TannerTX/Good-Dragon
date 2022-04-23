import React, { useState, useEffect } from "react"
import Axios from "axios"
import { Dropdown, Selection } from "react-dropdown-now"
import { Link, useLocation, useNavigate } from "react-router-dom"
import 'react-dropdown-now/style.css'
import "../assets/styles/Login.css"
import "../assets/styles/shop.css"
import "../Components/purchasableItems/PurchasableItems.js"
import "../Components/purchasableItems/productCard.css"
import PurchasableItems from "../Components/purchasableItems/PurchasableItems.js"
import Funcs  from "../Components/sortingFuncs/sorts.js"
import { FaWindows } from "react-icons/fa"

export default function Shop2() {
    
    Axios.defaults.withCredentials = true

    const location = useLocation()
    

    const [searchValue, setSearchValue] = useState("")
    const [items, setItems] = useState([])
    const [cart, setCart] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [sort, setSortMethod] = useState("")
    const [numSearches, setNumSearches] = useState(0)

    useEffect(() => {
        
        Axios.get("http://localhost:3001/login").then(response => {    
            if(response.data.loggedIn === true) 
            setCurrentUser(response.data.user[0])
             })

        if(location.state) {
            setSearchValue(location.state.search)
            console.log(searchValue)
        }
        
            console.log("SEARCH VALUE")
            console.log(searchValue)
            

            setTimeout(function(){
                if(searchValue === "" && numSearches === 0) {
                    console.log("DEFAULT WAS CHOSEN")
                    Axios.post("http://localHost:3001/getData", {sortMethod: ""}).then(res => {setItems(res.data) })
                    setNumSearches(1)
                    }
            
                    else if(searchValue != "" && numSearches === 0) {
                    console.log("NONDEFAULT WAS CHOSEN")
                    Axios.post("http://localHost:3001/getData", {searchData: searchValue}).then(res => {setItems(res.data)})
                    setNumSearches(1)
                    }
            }, 200);

    }, [searchValue, numSearches])


/*
    const setSort = (val) => {

        var query = ""
    
        switch(val) {
            case "Price: High to Low": query = "ORDER BY itemPrice DESC"; break;
            case "Price: Low to High": query = "ORDER BY itemPrice ASC"; break;
            case "Availability: High to Low": query = "ORDER BY availableQuantity DESC"; break;
            case "Availability: Low to High": query = "ORDER BY availableQuantity ASC"; break;
            default: query = "";
        }

        setSortMethod(query)
            
        Axios.post("http://localhost:3001/getData", {sortMethod: query}).then(res => { 
            setItems(res.data)
            console.log(items)
        })

    }
*/


    const sortCart = (val) => {

            switch(val) {
                case "Price: High to Low": setItems(items.sort(Funcs.PHL)); break;
                case "Price: Low to High": setItems(items.sort(Funcs.PLH)); break;
                case "Availability: High to Low": setItems(items.sort(Funcs.AHL)); break;
                case "Availability: Low to High": setItems(items.sort(Funcs.ALH)); break;
                default: setItems(items.sort(Funcs.PHL));
            }
            //setItems(res.data)
            setSortMethod(`Done${Math.floor(Math.random() * 100)}`)

    }

     
    return(

        <>
        { 
        
        currentUser.username ? 
            
        <>
        <Dropdown
        placeholder="Sort"
        className="dropdown_menu"
        options={['Price: High to Low', 'Price: Low to High', 'Availability: High to Low', "Availability: Low to High", "Unsorted"]}
        value="Unsorted"
        onChange={(response) => {console.log(response); sortCart(response.value)}}
        />

        <div class="cards">
            {items.map((prod) => <PurchasableItems item={prod} cart={cart} currUser={currentUser} />)}
        </div>
        </>

        :
    

        <div className="pleaseLogin-container">
            <div className="pleaseLogin-inner">
            <h3>Please <Link to="/login">Login</Link> to Continue</h3>
            </div>
        </div>

        }

        </>

        )
    }


