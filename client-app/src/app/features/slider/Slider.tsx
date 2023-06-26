import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Slider() {
    return (
        <>
            <div className='slider-slogan-container'>
                <h2 className='slider-slogan'>New car feeling,
                    without a new car payment!
                </h2>
            </div>

            <Carousel
                dynamicHeight={false}
                showThumbs={false}
                infiniteLoop={true}
                showStatus={false}
                swipeable={true}
                autoPlay={false}
                interval={4000}
            >
                <div>
                    <img className='carousel-img' src="./assets/sliderImages/Detail1.jpg" />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                    <img className='carousel-img' src="./assets/sliderImages/Detail2.jpeg" />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img className='carousel-img' src="./assets/sliderImages/Detail3.jpg" />
                    {/* <p className="legend">Legend 3</p> */}
                </div>
            </Carousel>
        </>
    )
}