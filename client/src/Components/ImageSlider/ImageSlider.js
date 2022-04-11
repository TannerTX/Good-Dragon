import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { RequestInterval } from '@splidejs/splide';

function ImageSlider(props){
        return (
            <>
            <Splide options={{rewind: true , autoplay: true, interval: 5000, pauseOnHover: true, padding: '20%',gap:'10%',speed:1500}}>
                <SplideSlide>
                    <img src={props.img1} height = "200" width = "100%" alt = "ERROR" />
                </SplideSlide>
                
            </Splide>              
            </>
        )
    }
export default ImageSlider;
