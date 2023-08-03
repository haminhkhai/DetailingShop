import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Grid, Header, Segment, Image } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default observer(function GalleryAdmin() {
    const { galleryStore: { loadingInitial, galleries,
        loadGalleries, loading, deleteGallery } } = useStore();
    const [target, setTarget] = useState("");

    useEffect(() => {
        if (galleries.length <= 1) loadGalleries();
    }, [loadGalleries])

    const handleDelete = (id: string) => {
        setTarget(id);
        deleteGallery(id);
    }

    return (
        <Segment.Group>
            <Segment basic>
                <Grid stackable doubling columns={4}>
                    <Grid.Column textAlign='left' width={8}>
                        <Header as='h2'>Galleries</Header>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Button floated="right" basic as={Link}
                            to={'/admin/createGallery'} content='Add Album' />
                    </Grid.Column>
                    {galleries.map(gallery => (
                        <Grid.Column key={gallery.id}>
                            <Card>
                                <Image
                                    src={(gallery.photos && gallery.photos[0]) ?
                                        gallery.photos[0].url : "../assets/placeholder.png"}
                                    wrapped ui={false}
                                />
                                <Card.Content>
                                    <Card.Header>{gallery.name}</Card.Header>
                                    <Card.Description>{gallery.description}</Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button
                                        onClick={() => handleDelete(gallery.id)}
                                        loading={loading && target === gallery.id}
                                        floated='right'
                                        content='Delete'
                                        color='red'
                                    />
                                    <Button
                                        as={Link}
                                        to={`/admin/manageGallery/${gallery.id}`}
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