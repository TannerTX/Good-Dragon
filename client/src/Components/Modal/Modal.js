import React from "react"
import "./modal.css"


export default function Dropbox(props) {

    const showState = () => {
        console.log(props.state.currentState)
    }

    return (
        <div className="dropdown-container">
            
            <div className="dropdown-header">
                <h4>{props.item.itemName}</h4>
            </div>
            <div class="img-container">
                <img src={props.item.itemImg} alt="dogImg" class="circleBase type1"></img>
            </div>

            <div className="dropdown-body">
                <h4>{props.item.description}</h4>
            </div>

            <div className="dropdown-footer">
            </div>
        </div>
    )
}