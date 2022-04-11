import React from "react"
import ImageSlider from "../Components/ImageSlider/ImageSlider.js";
import "./testingPage.css"

function Testing() {
    
    function importAll(r) {
        return r.keys().map(r);
      }
      const images = importAll(require.context('../assets/images/', false, /\.(png|jpe?g|svg)$/));
    
    return (
        
        <ImageSlider imgs={images} />
        
    )

}

export default Testing