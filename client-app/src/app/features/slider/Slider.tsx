import { observer } from 'mobx-react-lite';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Photo } from '../../models/photo';

interface Props {
    srcs: Photo[];
}

export default observer(function Slider({ srcs }: Props) {
    return (
        <>
            {/* <div className='slider-slogan-container'>
                <h2 className='slider-slogan'>New car feeling,
                    without a new car payment!
                </h2>
            </div> */}

            <Carousel
                className='carousel-container'
                dynamicHeight={false}
                showThumbs={false}
                infiniteLoop={true}
                showStatus={false}
                swipeable={true}
                autoPlay={false}
                interval={4000}

            >
                {
                    srcs.map(src =>
                        <div key={src.id}>
                            <img className='carousel-img' src={src.url} />
                        </div>
                    )
                }
            </Carousel>
        </>
    )
})