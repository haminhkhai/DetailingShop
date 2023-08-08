import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Card, Grid, Header, Segment, Image, Progress } from "semantic-ui-react";
import MyTextInput from "../common/form/MyTextInput";
import MyTextArea from "../common/form/MyTextArea";
import { Gallery } from "../models/gallery";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../stores/store";
import LoadingComponent from "../layout/LoadingComponent";
import { v4 as uuidv4 } from 'uuid';
import { observer } from "mobx-react-lite";
import PhotoUploadWidget from "../common/imageUpload/PhotoUploadWidget";

export default observer(function GalleryFormAdmin() {
    const { galleryStore:
        { loading, loadingInitial, galleries, createGallery, editGallery,
            loadGallery, uploadPhoto, deletePhoto, progress } } = useStore();
    const [gallery, setGallery] = useState<Gallery>(new Gallery());
    const navigate = useNavigate();
    const { id } = useParams();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState("");

    useEffect(() => {
        if (id && gallery.id === "") {
            loadGallery(id).then(gallery =>
                setGallery(new Gallery(gallery)))
        }
    }, [loadGallery])

    const handleSubmit = (gallery: Gallery, setSubmitting: any, setValues: any) => {
        if (!gallery.id) {
            let newGallery = {
                ...gallery, id: uuidv4()
            }
            createGallery(newGallery).then(() => {
                setSubmitting(false);
                setValues(new Gallery());
            })
        } else {
            editGallery({ ...gallery, photos: undefined }).then(() => {
                setSubmitting(false);
            })
        }
    }

    const handleUpload = async (file: Blob, id: string) => {
        const responseGallery = await uploadPhoto(file, id);
        setGallery(new Gallery(responseGallery!));
        setAddPhotoMode(false);
    }

    const handleDeletePhoto = (id: string) => {
        setTarget(id);
        deletePhoto(id).then(() => {
            const filteredPhotos = gallery.photos?.filter(p => p.id !== id);
            setGallery(current =>
                new Gallery({ ...current, photos: filteredPhotos }));
            if (galleries.find(g => g.id === gallery.id)) {
                galleries[galleries.indexOf(galleries.find(g => g.id === gallery.id)!)].photos = filteredPhotos;
            }
        });
    }

    if (loadingInitial) return <LoadingComponent content="Loading galleries..." />

    return (
        <>
            <Segment.Group>
                <Segment basic clearing>
                    {progress > 0 && <Progress attached="top" percent={progress} />}
                    <Header as='h2' content={id ? 'Edit Album' : 'Add Album'} />
                    <Formik
                        enableReinitialize
                        initialValues={gallery}
                        onSubmit={(values, { setSubmitting, setValues }) =>
                            handleSubmit(values, setSubmitting, setValues)}
                    >
                        {({ isSubmitting }) => (
                            <Form className="ui form large">
                                <MyTextInput placeholder="Album Name" name="name" />
                                <MyTextArea placeholder="Description" name="description" rows={3} />
                                <Button
                                    loading={isSubmitting}
                                    floated="right" positive
                                    type="submit"
                                    content="Save"
                                />
                                <Button
                                    onClick={() => navigate('/admin/galleries')}
                                    floated="right" type="reset" content="Cancel"
                                />
                            </Form>
                        )}
                    </Formik>
                </Segment>
            </Segment.Group>
            {id &&
                <Segment.Group>
                    <Segment basic>
                        <Grid>
                            <Grid.Column width={16}>
                                <Header content='Photos' floated="left" />
                                <Button
                                    content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                                    onClick={() => setAddPhotoMode(current => !current)}
                                    basic
                                    floated="right"
                                />
                            </Grid.Column>
                            <Grid.Column width={16}>
                                {addPhotoMode ?
                                    <PhotoUploadWidget
                                        loading={loading}
                                        uploadPhoto={(file) =>
                                            handleUpload(file, id)
                                        }
                                    />
                                    :
                                    <Card.Group itemsPerRow={4}>
                                        {gallery.photos?.map(photo => (
                                            <Card key={photo.id}>
                                                <Image src={photo.url} />
                                                <Button
                                                    color="red"
                                                    content='Delete'
                                                    onClick={() => handleDeletePhoto(photo.id)}
                                                    loading={loading && target === photo.id}
                                                />
                                            </Card>
                                        ))}

                                    </Card.Group>
                                }
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </Segment.Group>
            }
        </>
    )
})