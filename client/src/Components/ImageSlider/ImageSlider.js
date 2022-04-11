import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import dogPic from '../assets/iamges/dogs.mp4'



export function ImageSlider(){
        return (
            <>
            <Splide options={{rewind: true , autoplay: true, interval: 5000, pauseOnHover: true, padding: '20%',gap:'10%',speed:1500}}>
                <SplideSlide>
                    <img src="" height = "200" width = "100%" alt = "ERROR"/>
                </SplideSlide>
                <SplideSlide>
                    <img src="" height = "200" width = "100%" alt = "ERROR"/>
                </SplideSlide>
                <SplideSlide>
                    <img src="" height = "200" width = "100%" alt = "ERROR"/>
                </SplideSlide>
            </Splide>              
            </>
        )
    }
export default ImageSlider;
