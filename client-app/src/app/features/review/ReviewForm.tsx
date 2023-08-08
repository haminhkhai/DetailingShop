import { useState } from 'react';
import { Button, Grid, Header, Image, Progress, Segment } from 'semantic-ui-react';
import PhotoWidgetDropzone from '../../common/imageUpload/PhotoWidgetDropzone';
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';
import { Formik, Form } from 'formik';
import { ReviewDto } from '../../models/review';
import MyTextInput from '../../common/form/MyTextInput';
import MyTextArea from '../../common/form/MyTextArea';
import ReactStars from 'react-rating-star-with-type';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

export default observer(function ReviewForm() {
    const { reviewStore: { uploading, addReview, progress }, modalStore } = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [files, setFiles] = useState<any>([]);
    const [review, setReview] = useState<ReviewDto>(new ReviewDto());
    const [rating, setRating] = useState(0);

    //event fire when files state change
    // useEffect(() => console.log(files), [files]);

    function handleSubmit(review: ReviewDto) {
        if (!rating) {
            toast.error("Please rate your experience");
            return;
        }

        review.rating = rating;
        addReview(files, review).then(() => {
            toast.info("Thanks for reviewing!")
            modalStore.closeModal();
        });
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Your name is required")
    })

    return (
        <Segment.Group>
            <Segment basic clearing>
                {progress > 0 && <Progress percent={progress} attached='top' />}
                <Formik
                    validationSchema={validationSchema}
                    initialValues={review}
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
                                <Grid doubling stackable style={{ padding: '15px 0' }}>
                                    <Grid.Column width={8}>
                                        <PhotoWidgetDropzone setFiles={setFiles} />
                                    </Grid.Column>
                                    <Grid.Column width={8}>
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
