import React from 'react';
import CoverSlogan from '../cover slogan/CoverSlogan';
import Gallery from './Gallery';

export default function GalleryDashboard() {
    return (
        <>
            <CoverSlogan slogan='GALLERY' image='./assets/sliderImages/Detail3.jpg'/>
            <Gallery/>
        </>
    )
}