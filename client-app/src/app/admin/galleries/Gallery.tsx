import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Grid, Header, Segment, Image } from 'semantic-ui-react';
import { useStore } from '../../stores/store';

export default observer(function Gallery() {
    const { galleryStore: { galleries, loadGalleries,
        loading, deleteGallery } } = useStore();
    const [target, setTarget] = useState("");

    useEffect(() => {
        if (galleries.length <= 1) loadGalleries();
    }, [])

    const handleDelete = (id: string) => {
        setTarget(id);
        deleteGallery(id);
    }

    return (
        <Segment.Group>
            <Segment basic>
                <Grid columns={4}>
                    <Grid.Row>
                        <Grid.Column textAlign='left' width={9}>
                            <Header as='h2'>Galleries</Header>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Button
                                icon='add'
                                floated="right" basic as={Link}
                                to={'/admin/createGallery'} content='Add Album'
                            />
                        </Grid.Column>
                    </Grid.Row>
                    {galleries.map(gallery => (
                        <Grid.Column computer={4} tablet={8} mobile={16} key={gallery.id}>
                            <Card style={{margin: '0 auto'}}>
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