import React from 'react';
import NavBar from '../../layout/NavBar';
import Slider from '../slider/Slider';
import ServiceDashboard from '../services/ServiceDashboard';
import ContactInfo from '../info/ContactInfo';
import MapReveal from '../info/MapReveal';
import Footer from '../footer/Footer';
import { Container, Divider, Header, Segment } from 'semantic-ui-react';

export default function HomePage() {
    return (
        <>
            <NavBar />
            <Slider />
            <Segment className='package-introducing' basic style={{padding: '8em 0em'}}>
                <Container text textAlign='center'>
                <Header as='h1'>SERVICE PACKAGES</Header>
                <Divider className='packages-divider' />
                <span>Which packages is the best for your vehicle</span>
                </Container>
            </Segment>
            <ServiceDashboard isBookingPage={false} />
            <ContactInfo />
            <MapReveal />
            <Footer />
        </>
    )
}