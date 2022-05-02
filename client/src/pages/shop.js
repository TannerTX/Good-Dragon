import React from "react"
import Axios from "axios"
import { Dropdown, Selection } from "react-dropdown-now"
import { Link, useLocation } from "react-router-dom"
import 'react-dropdown-now/style.css'
import "../assets/styles/Login.css"
import "../assets/styles/shop.css"
import "../Components/purchasableItems/PurchasableItems.js"
import "../Components/purchasableItems/productCard.css"
import PurchasableItems from "../Components/purchasableItems/PurchasableItems.js"
import { FaWindows } from "react-icons/fa"

function GetLocation() {
    const location = useLocation()

    return location.state.search
}

export default class Shop extends React.Component {
    
    constructor(props){
        super(props);
        Axios.defaults.withCredentials = true
        this.state = {
            searchValue: GetLocation || "",
            items: [],
            cart: [],
            currentUser: [{}],
            sortMethod: "",
        }
    }

    componentDidMount() {
        console.log(`SEARCH VALUE: ${this.state.searchValue}`)

        Axios.post("https://good-dragon.herokuapp.com/getData", {sortMethod: ""}).then(res => {this.setState({items: res.data})})

        Axios.get("https://good-dragon.herokuapp.com/login").then(response => {    
            if(response.data.loggedIn === true) 
            this.setState({currentUser: response.data.user[0]})
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

        this.setState({sortMethod: query}, () => Axios.post("https://good-dragon.herokuapp.com/getData", {sortMethod: this.state.sortMethod}).then(res => { 
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
