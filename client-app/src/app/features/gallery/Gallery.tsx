import React from "react";
import { Image, Card, Container, Segment, Grid } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import Slider from "../slider/Slider";
import { observer } from "mobx-react-lite";

export default observer(function Gallery() {
    const { modalStore } = useStore();
    return (
        <Segment basic style={{ padding: '8em 0em' }}>
            <Container>
                <Grid className="gallery-wrapper"
                    container stackable doubling columns={4} textAlign='center'>
                    <Grid.Column>
                        <Card
                            onClick={() => { modalStore.openModal(<Slider />) }}>
                            <Image src='./assets/serviceCardImages/serviceImage1.jpg' wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>Album 1</Card.Header>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card
                            onClick={() => { modalStore.openModal(<Slider />) }}>
                            <Image src='./assets/serviceCardImages/serviceImage2.jpg' wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>Album 2</Card.Header>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card>
                            <Image src='./assets/serviceCardImages/serviceImage3.jpg' wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>Album 3</Card.Header>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card>
                            <Image src='./assets/serviceCardImages/serviceImage4.jpg' wrapped ui={false} />
                            <Card.Content>
                                <Card.Header>Album 4</Card.Header>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid>
            </Container>
        </Segment>
    )
})