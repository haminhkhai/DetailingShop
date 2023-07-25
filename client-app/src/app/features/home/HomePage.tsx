import React from 'react';
import NavBar from '../../layout/NavBar';
import Slider from '../slider/Slider';
import ContactInfo from '../info/ContactInfo';
import MapReveal from '../info/MapReveal';
import { Container, Divider, Header, Segment } from 'semantic-ui-react';
import Footer from '../../layout/footer/Footer';
import AboutUsHome from '../about-us/AboutUsHome';
import VehicleType from '../booking/VehicleType';
import { Photo } from '../../models/photo';
import ServiceUser from '../booking/ServiceUser';

export default function HomePage() {
    const srcs: Photo[] = [{ id: "", url: "./assets/sliderImages/Detail1.jpg" }, { id: "", url: "./assets/sliderImages/Detail2.jpeg" }, { id: "", url: "./assets/sliderImages/Detail3.jpg" }];
    return (
        <>
            <NavBar predicate='user' />
            <Slider srcs={srcs} />
            <AboutUsHome />
            <Segment className='package-introducing' basic style={{ padding: '0em 0em 5em 0em' }}>
                <Container text textAlign='center'>
                    <Header as='h1'>SERVICE PACKAGES</Header>
                    <Divider className='packages-divider' />
                    <span>Which packages is the best for your vehicle</span>
                </Container>
            </Segment>
            <VehicleType style={{ padding: '0 0 5em 0' }} setVehicleType={function (vehicleType: string): void {
                throw new Error('Function not implemented.');
            }} vehicleType={''} />
            <ServiceUser selectedService='' services={[]} predicate={'user'} setService={function (id: string): void {
                throw new Error('Function not implemented.');
            }} />
            <ContactInfo />
            <MapReveal />
            <Footer />
        </>
    )
}