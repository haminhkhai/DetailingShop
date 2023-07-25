import { useEffect, useState } from 'react';
import { Button, Container, Grid, Header, Image, Message, MessageHeader, Segment } from 'semantic-ui-react';
import PhotoWidgetDropzone from '../../common/imageUpload/PhotoWidgetDropzone';
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';
import { Formik, Form } from 'formik';
import { Review } from '../../models/review';
import MyTextInput from '../../common/form/MyTextInput';
import MyTextArea from '../../common/form/MyTextArea';
import ReactStars from 'react-rating-star-with-type';
import ReviewMessage from '../../common/modal/ReviewMessage';

export default observer(function ReviewForm() {
    const { reviewStore: { uploading, addReview }, modalStore } = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [files, setFiles] = useState<any>([]);
    const [reviewForm, setReviewForm] = useState<Review>(new Review());
    const [rating, setRating] = useState(0);

    //event fire when files state change
    useEffect(() => console.log(files), [files]);

    function handleSubmit(review: Review) {
        review.rating = rating;
        addReview(files, review).then(() => {
            modalStore.openModal(<ReviewMessage close={modalStore.closeModal}/>, "tiny")
        });
    }

    return (
        <Segment.Group>
            <Segment basic clearing>
                <Formik
                    initialValues={reviewForm}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {({ }) => (
                        <Form className="ui form large">
                            <Header color='blue' as='h2'>Write your review</Header>
                            <ReactStars
                                classNames='rating-star-form'
                                isEdit={true}
                                size={35}
                                onChange={newRating => setRating(newRating)}
                            />
                            <MyTextInput name='name' label='Your name' placeholder='' />
                            <MyTextArea name='experience' placeholder='' label='Your Experience' rows={2} />
                            {
                                addPhotoMode &&
                                <Grid style={{ padding: '15px 0' }}>
                                    <Grid.Column width={4}>
                                        <PhotoWidgetDropzone setFiles={setFiles} />
                                    </Grid.Column>
                                    <Grid.Column width={12}>
                                        {files.map((file: any) => {
                                            return (<Image key={file.name} floated='right' size='small' src={file.preview} />)
                                        })}
                                    </Grid.Column>
                                </Grid>
                            }
                            <Button
                                positive
                                type='submit'
                                content='Submit'
                                floated='right'
                                loading={uploading}
                            />
                        </Form>
                    )}
                </Formik>
                <Button
                    content={addPhotoMode ? 'Cancel' : 'Add photos'}
                    floated='right'
                    onClick={() => setAddPhotoMode(!addPhotoMode)}
                />
            </Segment>
        </Segment.Group>
    )
})
