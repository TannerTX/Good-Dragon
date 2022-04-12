import React from "react"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import './splide-sea-green.min.css'
import { RequestInterval } from '@splidejs/splide';

function ImageSlider(props){
    
        return (    
            <Splide options={{rewind: true , autoplay: true, interval: 3500, pauseOnHover: true, padding: '30%',gap:'5%',speed:1500}}>
                {props.imgs.map( (img) => <SplideSlide> <img src={img} /> </SplideSlide> )}
            </Splide>                 
        )
    }
export default ImageSlider;
