import React from "react"
import Axios from "axios"
import { Dropdown, Selection } from "react-dropdown-now"
import { Link } from "react-router-dom"
import 'react-dropdown-now/style.css'
import "../assets/styles/Login.css"
import "../assets/styles/shop.css"
import "../Components/purchasableItems/PurchasableItems.js"
import "../Components/purchasableItems/productCard.css"
import PurchasableItems from "../Components/purchasableItems/PurchasableItems.js"

import { FaWindows } from "react-icons/fa"



export default class Shop extends React.Component {
    
    constructor(props){
        super(props);
        Axios.defaults.withCredentials = true
        this.state = {
            items: [],
            cart: [],
            currentUser: [{}],
            sortMethod: "",
        }
    }

    componentDidMount() {
        Axios.post("http://localhost:3001/getData").then(res => {
            this.setState({items: res.data});
             console.log(this.state.items);
            })
        
        Axios.get("http://localhost:3001/login").then(response => {    
            if(response.data.loggedIn === true) 
            this.state.currentUser = response.data.user[0]
            
             })   
    }

   

    
 render(){

    
    
    
    const setSort = (val) => {

        var query = ""
    
        switch(val) {
            case "Price: Hight to Low": query = "ORDER BY itemPrice DESC"; break;
            case "Price: Low to High": query = "ORDER BY itemPrice ASC"; break;
            case "Availability: High to Low": query = "ORDER BY availableQuantity DESC"; break;
            case "Availability: Low to High": query = "ORDER BY availableQuantity ASC"; break;
            default: query = "";
        }

        this.setState({sortMethod: query}, () => Axios.post("http://localhost:3001/getData", {sortMethod: this.state.sortMethod}).then(res => { 
            this.setState({items: res.data}); 
            console.log(this.state.items)
        }))

    }
     
    return(

        <>
        { 
        
        this.state.currentUser.username ? 

        <>
        <Dropdown
        placeholder="Sort"
        className="dropdown_menu"
        options={['Price: Hight to Low', 'Price: Low to High', 'Availability: High to Low', "Availability: Low to High", "Unsorted"]}
        value="Unsorted"
        onChange={(response) => setSort(response.value)}
        />

        <div class="cards">
            {this.state.items.map((prod) => <PurchasableItems item={prod} cart={this.state.cart} currUser={this.state.currentUser} />)}
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

}
