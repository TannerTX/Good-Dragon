import React from "react";
import "../assets/styles/style.css"
import SearchBtn from "../Components/SearchBtn/SearchButton.js"
import bgVideo from '../assets/videos/dogs.mp4'

function Home() {
    return(
        <body> 
            <div>
            <video autoPlay loop muted><source src={bgVideo} type="video/mp4"/></video>
            <img src='https://imgur.com/X5KLtYQ.png' class="center fade-in-image" />
            <div class="yes-body">
            <SearchBtn />
            </div>
            
            </div>
        </body>
    );

}

export default Home;