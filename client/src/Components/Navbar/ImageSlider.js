import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

export function ImageSlider(){
        return (
            <>
            <Splide options={ {rewind: true , autoplay: true, interval: 5000, pauseOnHover: true} }>
                <SplideSlide>
                    <img src="client/public/assets/testImage1.jpg" alt="Image 1"/>
                </SplideSlide>
                <SplideSlide>
                    <img src="image2.jpg" alt="Image 2"/>
                </SplideSlide>
                <SplideSlide>
                    <img src="image3.jpg" alt="Image 3"/>
                </SplideSlide>
            </Splide>              
            </>
        )
    }
export default ImageSlider;
