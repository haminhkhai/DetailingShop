import React from 'react';
import { Card, Container, Divider, Grid, Header, Segment } from 'semantic-ui-react';
import ServiceCard from './ServiceCard';

interface Props {
    isBookingPage: boolean;
}

export default function ({ isBookingPage }: Props) {
    return (
        <>
            <Segment basic className='service-card-container' style={{padding: '0em', margin:'0'}}>
                <Grid container stackable doubling columns={4} textAlign='center'>
                    <Grid.Column>
                        <ServiceCard isBookingPage={isBookingPage} name="CAR WASH & DETAILING"
                            image={'/assets/serviceCardImages/serviceImage1.jpg'} />
                    </Grid.Column>
                    <Grid.Column>
                        <ServiceCard isBookingPage={isBookingPage} name="CERAMIC COATINGS"
                            image={'/assets/serviceCardImages/serviceImage2.jpg'} />
                    </Grid.Column>
                    <Grid.Column>
                        <ServiceCard
                            isBookingPage={isBookingPage}
                            name="PAINT PROTECTION FILM"
                            image={'/assets/serviceCardImages/serviceImage3.jpg'} />
                    </Grid.Column>
                    <Grid.Column>
                        <ServiceCard
                            isBookingPage={isBookingPage}
                            name="WINDOW TINT"
                            image={'/assets/serviceCardImages/serviceImage4.jpg'} />
                    </Grid.Column>
                    <Grid.Column>
                        <ServiceCard
                            isBookingPage={isBookingPage}
                            name="INTERIOR DETAILING"
                            image={'/assets/serviceCardImages/serviceImage2.jpg'} />
                    </Grid.Column>
                </Grid>
            </Segment>
        </>
    )
}