import { observer } from 'mobx-react-lite';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Photo } from '../../models/photo';
import { useEffect, useState } from 'react';
import anime from "animejs/lib/anime.es.js"

interface Props {
    srcs: Photo[];
    selectedPhoto?: string;
    predicate: string;
}

export default observer(function Slider({ srcs, selectedPhoto, predicate }: Props) {
    const [target, setTarget] = useState(0);
    useEffect(() => {
        if (predicate === 'carousel') {
            var textWrapper = document.querySelector('.ml2');
            textWrapper!.innerHTML = textWrapper!.textContent!.replace(/\S/g, "<span class='letter'>$&</span>");
            anime.timeline({ loop: true })
                .add({
                    targets: '.ml2 .letter',
                    scale: [4, 1],
                    opacity: [0, 1],
                    translateZ: 0,
                    easing: "easeOutExpo",
                    duration: 950,
                    delay: (el, i) => 70 * i
                }).add({
                    targets: '.ml2',
                    opacity: 0,
                    duration: 3000,
                    easing: "easeOutExpo",
                    delay: 6000
                });
        }
    }, [target])

    if (selectedPhoto) {
        srcs = [srcs.find(s => s.id === selectedPhoto)!,
        ...srcs.filter(s => s.id !== selectedPhoto)];
    }

    return (
        <>
            {predicate === 'carousel' && <div className='slider-slogan-container'>
                <h2 className='ml2 slider-slogan'>
                    {/* New car feeling, without new car payment */}
                    {srcs[target] && srcs[target].message}
                </h2>
            </div>}

            <Carousel
                className='carousel-container'
                dynamicHeight={false}
                showThumbs={false}
                infiniteLoop={true}
                showStatus={false}
                swipeable={true}
                autoPlay={true}
                interval={4000}
                onChange={(e) => setTarget(e)}
            >
                {
                    srcs.map((src) => {
                        return <div key={src.id}>
                            <img id={src.id} className={predicate === 'carousel' ? 'carousel-img' : 'gallery-img'} src={src.url} />
                        </div>

                    })
                }
            </Carousel>
        </>
    )
})