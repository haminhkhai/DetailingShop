import { useEffect, useRef, useState } from 'react';
import { Button, Grid, Header, Image, Label, Progress, Segment } from 'semantic-ui-react';
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
import { SUPPORTED_FORMATS } from '../../models/photo';
import ReCAPTCHA from 'react-google-recaptcha';

export default observer(function ReviewForm() {
    const { reviewStore: { uploading, addReview, progress }, modalStore } = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [files, setFiles] = useState<any>([]);
    const [review, setReview] = useState<ReviewDto>(new ReviewDto());
    const [rating, setRating] = useState(0);
    const [error, setError] = useState("");
    const [captchaPass, setCaptchaPass] = useState(false);
    const captchaRef = useRef<ReCAPTCHA>(null);

    useEffect(() => {
        fileValidation(files);
    }, [files])

    function handleSubmit(review: ReviewDto) {
        let token = "";
        token = captchaRef.current?.getValue()!;
        
        if (token === "") {
            toast.error("Please tick captcha box to submit your review");
            return;
        }

        review.captchaToken = token;

        if (!rating) {
            toast.error("Please rate your experience");
            return;
        }

        review.rating = rating;
        addReview(files, review).then(() => {
            toast.info("Thanks for reviewing!");
            modalStore.closeModal();
        });
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Your name is required")
    })

    const fileValidation = (files: any[]) => {
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

    const onCaptchaChange = async (value: string | null) => {
        if (value) {
            setCaptchaPass(true);
        }
        else {
            setCaptchaPass(false);
        }
    }

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
                                        {error !== "" &&
                                            <Label style={{ margin: '2em 0' }} color='red' content={error} />}
                                    </Grid.Column>
                                </Grid>
                            }
                            <ReCAPTCHA
                                style={{ float: 'right' }}
                                sitekey={process.env.REACT_APP_SITE_KEY!}
                                onChange={onCaptchaChange}
                                ref={captchaRef}
                            />
                            <div style={{ width: '100%', display: 'inline-block', padding: '15px 0 0 0' }}>
                                <Button
                                    disabled={error !== "" || !captchaPass}
                                    positive
                                    type='submit'
                                    content='Submit'
                                    floated='right'
                                    loading={uploading}
                                />
                                <Button
                                    type='button'
                                    content={addPhotoMode ? 'Cancel' : 'Add photos'}
                                    floated='right'
                                    onClick={() => setAddPhotoMode(!addPhotoMode)}

                                />
                            </div>
                        </Form>
                    )}
                </Formik>

            </Segment>
        </Segment.Group>
    )
})
