import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Grid, Header, Segment, Image } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../layout/LoadingComponent";

export default observer(function Carousel() {
    const { carouselStore: { loadingInitial, loading, carousels, loadCarousels, deleteCarousel } } = useStore();
    const [target, setTarget] = useState(0);

    useEffect(() => {
        if (carousels.length <= 1) loadCarousels();
    }, [loadCarousels])

    if (loadingInitial) return <LoadingComponent content="Loading slider..." />

    return (
        <Segment.Group>
            <Segment>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8} >
                            <Header as='h2' content='Homepage slider' />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Button
                                as={Link} to='/admin/createCarousel' icon='add'
                                floated="right" basic content='Add photo'
                            />
                        </Grid.Column>
                    </Grid.Row>
                    {carousels.map(carousel => (
                        <Grid.Column textAlign="center" computer={4} tablet={5} mobile={16} key={carousel.id}>
                            <Card style={{ margin: '0 auto' }}>
                                <Image
                                    src={carousel.image}
                                    wrapped ui={false}
                                />
                                <Card.Content>
                                    <Card.Header>{carousel.message}</Card.Header>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button
                                        onClick={() => {
                                            deleteCarousel(carousel.id);
                                            setTarget(carousel.id)
                                        }}
                                        loading={loading && target === carousel.id}
                                        floated='right'
                                        content='Delete'
                                        color='red'
                                    />
                                    <Button
                                        as={Link}
                                        to={`/admin/manageCarousel/${carousel.id}`}
                                        floated='right'
                                        content="Edit"
                                        color='blue'
                                    />
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    ))}
                </Grid>
            </Segment>
        </Segment.Group>
    )
})