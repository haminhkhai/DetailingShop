import React from "react";
import { Button, Card, Image } from "semantic-ui-react";

interface Props {
    name: string;
    image: string;
    isBookingPage: boolean;
}

export default function ({ image, name, isBookingPage }: Props) {
    return (
        <Card centered={true} fluid className="service-card">
            <Card.Content className="price-container">
                <Card.Header style={{ fontSize: '15px' }} className="service-name">{name}</Card.Header>
                <div className="price-wrapper">
                    <span className="price-currency">$</span>
                    <span className='price-unit'>15</span>
                    <span className='price-decimal'>03</span>
                </div>

            </Card.Content>
            <Image src={image} wrapped ui={false} />
            <Card.Content>
                {/* <Card.Header>Car Wash & Detailing</Card.Header> */}
                {/* <Card.Meta>
                    <span className='date'>Joined in 2015</span>
                </Card.Meta> */}

                <Card.Description>
                    Routine clean or
                    prepping for sale?
                    Our auto detaling packages makes for great maintenance and is customizable!
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                {isBookingPage ? <Button basic color="blue" content='Book Now' /> :
                    <Button color="blue" content='Learn more' />}
            </Card.Content>
        </Card>
    )
}