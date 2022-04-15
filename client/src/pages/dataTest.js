import React, { useState } from "react"
import Axios from "axios"
import "./Login.css"
import "../Components/purchasableItems/PurchasableItems.js"
import PurchasableItems from "../Components/purchasableItems/PurchasableItems.js"




export default class DataTest2 extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            items: [{}]
        }
    }

    componentDidMount() {
        Axios.post("http://localhost:3001/getData").then(res => {this.setState({items: res.data}); console.log(this.state.items);})
    }
    
 render(){
    return(
        <div class="cards">
        <PurchasableItems items={this.state.items} />
        </div>
        )
    }

}
