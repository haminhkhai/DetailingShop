import React, { useEffect } from 'react';
import { Container, Divider, Grid, Header, List, Segment } from 'semantic-ui-react';
import { useStore } from '../../stores/store';


export default function Footer() {
    const { aboutUsStore: { loadAboutUs, aboutUs } } = useStore();

    useEffect(() => {
        if (!aboutUs) loadAboutUs();
    }, [aboutUs])

    return (
        <Segment style={{ padding: '5em 0em', margin: '0' }} inverted textAlign="left"
            className='footer-container'>
            <Container>
                <Grid stackable inverted columns={3}>
                    <Grid.Row>
                        <Grid.Column textAlign='center' >
                            <Header color='grey' as='h3'>
                                {aboutUs.header}
                            </Header>
                            <span>
                                {aboutUs.body}
                            </span>
                            <img src="./assets/logo.png" width="60px" height="60px" alt="" style={{margin:'10px auto'}}/>
                        </Grid.Column>
                        <Grid.Column>
                            {/* <Header color='grey' as='h3'>
                                SERVICES
                            </Header>
                            <List>
                                <List.Item><a href='#'>Car Wash & Detailing</a></List.Item>
                                <List.Item><a href='#'>Ceramic Coatings</a></List.Item>
                                <List.Item><a href='#'>Paint Protection Film</a></List.Item>
                                <List.Item><a href='#'>Window Tint</a></List.Item>
                            </List> */}
                        </Grid.Column>
                        <Grid.Column textAlign='center'>
                            <Header color='grey' as='h3'>
                                COMPANY
                            </Header>
                            <List>
                                <List.Item><a href='/'>Homepage</a></List.Item>
                                <List.Item><a href='/booking'>Booking</a></List.Item>
                                <List.Item><a href='/gallery'>Gallery</a></List.Item>
                                <List.Item><a href='/reviews'>Reviews</a></List.Item>
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