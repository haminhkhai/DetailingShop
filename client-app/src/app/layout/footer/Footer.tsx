import React from 'react';
import { Container, Divider, Grid, Header, List, Segment } from 'semantic-ui-react';

export default function Footer() {
    return (
        <Segment style={{ padding: '5em 0em', margin: '0' }} inverted textAlign="left"
            className='footer-container'>
            <Container>
                <Grid stackable divided inverted columns={3}>
                    <Grid.Row>
                        <Grid.Column >
                            <Header color='grey' as='h3'>
                                ABOUT
                            </Header>
                            <span>Autospa Hand Wash is an eco-friendly<br />
                                hand car wash and detailing service<br />
                                based in Portland.
                            </span>
                            <img src="./assets/logo.png" width="60px" height="60px" alt="" />
                        </Grid.Column>
                        <Grid.Column>
                            <Header color='grey' as='h3'>
                                SERVICES
                            </Header>
                            <List>
                                <List.Item><a href='#'>Car Wash & Detailing</a></List.Item>
                                <List.Item><a href='#'>Ceramic Coatings</a></List.Item>
                                <List.Item><a href='#'>Paint Protection Film</a></List.Item>
                                <List.Item><a href='#'>Window Tint</a></List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column>
                            <Header color='grey' as='h3'>
                                COMPANY
                            </Header>
                            <List>
                                <List.Item><a href='#'>Booking</a></List.Item>
                                <List.Item><a href='#'>Service Pack</a></List.Item>
                                <List.Item><a href='#'>Gallery</a></List.Item>
                                <List.Item><a href='#'>Reviews</a></List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
            <Container className='end-footer-container' textAlign='center'>
                <Divider className='footer-divider' clearing={true} />
                <p>Mr. Detail Auto Salon © 2023 Mr. Detail Auto Salon.</p>
            </Container>
        </Segment>
    )
}