import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Header, Image, Progress, Segment } from "semantic-ui-react";
import MyTextInput from "../../common/form/MyTextInput";
import MyTextArea from "../../common/form/MyTextArea";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import PhotoUploadWidget from "../../common/imageUpload/PhotoUploadWidget";
import * as Yup from 'yup';
import LoadingComponent from "../../layout/LoadingComponent";

export default observer(function AboutUsAdmin() {
    const { aboutUsStore: { loadAboutUs, editAboutUs, aboutUs,
        uploading, progress, uploadPhoto, } } = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);

    function handlePhotoUpload(file: Blob) {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    }

    useEffect(() => {
        loadAboutUs();
    }, []);

    const validationSchema = Yup.object({
        header: Yup.string().required("Header is required"),
        body: Yup.string().required("Description is required")
    })

    return (
        <>
            <Segment.Group>
                <Segment clearing>
                    {progress > 0 && <Progress percent={progress} attached='top' />}
                    <Header as='h2'>About us</Header>
                    <Formik
                        validationSchema={validationSchema}
                        enableReinitialize
                        initialValues={aboutUs}
                        onSubmit={(values, { setSubmitting }) => {
                            editAboutUs(values).then(() => setSubmitting(false));
                        }}
                    >
                        {({ isSubmitting}) => (
                            <Form className="ui form large">
                                <MyTextInput placeholder="Header" name="header" />
                                <MyTextArea placeholder="Description" name="body" rows={4} />

                                <Button
                                    disabled={isSubmitting}
                                    positive floated="right"
                                    type="submit" content="Save"
                                    loading={isSubmitting}
                                />
                            </Form>
                        )}
                    </Formik>
                </Segment>
                <Segment basic clearing>
                    <Button
                        floated="right"
                        basic
                        content={addPhotoMode ? "Cancel" : "Change image"}
                        onClick={() => setAddPhotoMode(!addPhotoMode)}
                    />
                    <Image
                        style={{ padding: '20px 0', margin: '0 auto' }}
                        size="large"
                        src={aboutUs.image || '../assets/placeholder.png'}
                    />
                    <br />
                    {addPhotoMode &&
                        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />}
                </Segment>
            </Segment.Group>
        </>
    )
})