import { observer } from 'mobx-react-lite';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Photo } from '../../models/photo';
import { useEffect } from 'react';

interface Props {
    srcs: Photo[];
    selectedPhoto?: string;
}

export default observer(function Slider({ srcs, selectedPhoto }: Props) {
    
    if (selectedPhoto) srcs = [srcs.find(s => s.id === selectedPhoto)!, ...srcs];
    
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
                    srcs.map(src => {
                        return <div key={src.id}>
                            <img className='carousel-img' src={src.url} />
                        </div>
                    })
                }
            </Carousel>
        </>
    )
})