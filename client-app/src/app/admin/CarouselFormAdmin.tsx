import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Button, Grid, Header, Label, Progress, Segment } from 'semantic-ui-react';
import MyTextInput from '../common/form/MyTextInput';
import PhotoWidgetDropzone from '../common/imageUpload/PhotoWidgetDropzone';
import { Cropper } from 'react-cropper';
import { Link, useParams } from 'react-router-dom';
import { Carousel } from '../models/carousel';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { SUPPORTED_FORMATS } from '../models/photo';

export default observer(function CarouselFormAdmin() {
    const { carouselStore: { progress, createCarousel, loadCarousel, editCarousel } } = useStore();
    const [carousel, setCarousel] = useState<Carousel>(new Carousel());
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();
    const { id } = useParams();
    const [error, setError] = useState("");

    useEffect(() => {
        if (files.length > 0) fileValidation(files);
        //dispose file.preview after using
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview))
        }
    }, [files])

    useEffect(() => {
        if (id) {
            loadCarousel(Number.parseInt(id)).then((carousel) => {
                setCarousel(new Carousel(carousel));
                setFiles([{ preview: carousel?.image, imageId: carousel?.imageId, type: 'image/jpeg' }]);
            })
        }
    }, [id])

    const handleSubmit = (carousel: Carousel,
        setSubmitting: (isSubmitting: boolean) => void,
        setValues: (carousel: Carousel) => void) => {

        if (files.length == 0) {
            setError("Please choose a image to upload");
            setSubmitting(false);
            return;
        }

        if (cropper && cropper.getCroppedCanvas() && files[0].imageId !== carousel.imageId) {
            cropper.getCroppedCanvas().toBlob(blob => {
                if (!carousel.id)
                    createCarousel(blob, carousel).then(() => {
                        setSubmitting(false);
                        setValues(new Carousel());
                        setFiles([]);
                    });
                else
                    editCarousel(blob, carousel).then(() => {
                        setSubmitting(false);
                    });

            }, "image/jpeg")

        } else {
            if (!carousel.id)
                createCarousel(null, carousel).then(() => {
                    setSubmitting(false);
                    setValues(new Carousel());
                });
            else
                editCarousel(null, carousel).then(() => {
                    setSubmitting(false);
                });
        }
    }

    const fileValidation = (files: any[]) => {
        if (files.length < 1) {
            setError("Please choose a image to upload");
            // return;
        }
        files.forEach(file => {
            if (!SUPPORTED_FORMATS.includes(file.type)) {
                setError("Format unsupported");
                return;
            }
            if (file.size > 1024 * 1024 * 5) {
                setError("Images must be smaller than 5MB");
                return;
            }
            setError("");
        });
    }

    return (
        <Segment.Group>
            <Segment clearing>
                {progress > 0 && <Progress percent={progress} attached='top' />}
                <Header as='h2' content='Add slider photo' />
                <Formik
                    enableReinitialize
                    initialValues={carousel}
                    onSubmit={(values, { setSubmitting, setValues }) =>
                        handleSubmit(values, setSubmitting, setValues)}
                >
                    {({ isSubmitting }) => (
                        <Form className='ui form large'>
                            <MyTextInput placeholder='Text' name='message' />
                            <Grid stackable style={{ padding: '1em 0 0 0' }}>
                                <Grid.Column width={6}>
                                    <Header sub color='teal' content='Step 1 - Add Photo' />
                                    <PhotoWidgetDropzone setFiles={setFiles} />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Header sub color='teal' content='Step 2 - Resize image' />
                                    {files && files.length > 0 && (
                                        <Cropper
                                            src={files[0].preview}
                                            style={{ height: 200, width: '100%' }}
                                            initialAspectRatio={16 / 9}
                                            aspectRatio={16 / 9}
                                            preview='.img-preview'
                                            guides={false}
                                            viewMode={2}
                                            autoCropArea={1}
                                            background={false}
                                            onInitialized={cropper => setCropper(cropper)}
                                        />
                                    )}
                                </Grid.Column>
                                <Grid.Column width={1} />
                                <Grid.Column width={4}>
                                    <Header sub color='teal' content='Step 3 - Preview & Upload' />
                                    {files && files.length > 0 &&
                                        <>
                                            <div className='img-preview'
                                                style={{ minHeight: 200, overflow: 'hidden' }} />

                                        </>
                                    }
                                    {error !== "" &&
                                        <Label style={{ margin: '2em 0' }} color='red' content={error} />}
                                </Grid.Column>
                            </Grid>
                            <br />
                            <Button
                                disabled={error !== ""}
                                loading={isSubmitting}
                                floated='right' positive
                                type='submit' content='Submit'
                            />
                            <Button
                                onClick={() => setError("")}
                                as={Link} to='/admin/carousels'
                                floated='right' basic type='reset' content='Cancel'
                            />
                        </Form>
                    )}
                </Formik>
            </Segment>
        </Segment.Group>
    )
})