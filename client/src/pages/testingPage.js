import React from "react"
import ImageSlider from "../Components/ImageSlider/ImageSlider.js";
import Dropdown from "../Components/Modal/Modal.js"
import "../assets/styles/testingPage.css"

function importAll(r) {
        return r.keys().map(r);
      }


function Testing() {
    
    const images = importAll(require.context('../assets/images/', false, /\.(png|jpe?g|svg)$/));
    console.log(images)
    const item = {itemName: "Husky", description: "Mans best friend HAHAH I swear I don't have paranoid schizophrenia"}

    return (
        <Dropdown item={item} />
    )

}

export default Testing