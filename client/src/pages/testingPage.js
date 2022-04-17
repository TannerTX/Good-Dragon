import React from "react"
import ImageSlider from "../Components/ImageSlider/ImageSlider.js";
import "../assets/styles/testingPage.css"

function importAll(r) {
        return r.keys().map(r);
      }


function Testing() {
    
    const images = importAll(require.context('../assets/images/', false, /\.(png|jpe?g|svg)$/));
    console.log(images)
    
    return (
        <ImageSlider imgs={images} />  
    )

}

export default Testing