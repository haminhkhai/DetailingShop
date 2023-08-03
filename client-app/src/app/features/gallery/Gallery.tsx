import React, { useEffect } from "react";
import { Image, Card, Container, Segment, Grid } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import Slider from "../slider/Slider";
import { observer } from "mobx-react-lite";
import { Photo } from "../../models/photo";
import LoadingComponent from "../../layout/LoadingComponent";

export default observer(function Gallery() {
    const { modalStore, galleryStore: { loadingInitial, loadGalleries, galleries } } = useStore();

    useEffect(() => {
        if (galleries.length <= 1) loadGalleries();
    }, [loadGalleries])

    const handleSlider = (photos: Photo[] | undefined) => {
        if (photos) {
            modalStore.openModal(<Slider predicate="gallery" srcs={photos} />, "large");
        }
    }

    if (loadingInitial) return <LoadingComponent content="Loading Galleries..." />

    return (
        <Segment basic style={{ padding: '8em 0em' }}>
            <Container>
                <Grid className="gallery-wrapper"
                    container stackable doubling columns={4} textAlign='center'>
                    {galleries.map(gallery => (
                        <Grid.Column key={gallery.id}>
                            <Card
                                onClick={() => handleSlider(gallery.photos)}>
                                <Image src='./assets/serviceCardImages/serviceImage1.jpg' wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header>{gallery.name}</Card.Header>
                                    <Card.Description>{gallery.description}</Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    ))}
                </Grid>
            </Container>
        </Segment>
    )
})