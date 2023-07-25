import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Header, Image, Segment } from "semantic-ui-react";
import MyTextInput from "../common/form/MyTextInput";
import MyTextArea from "../common/form/MyTextArea";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import PhotoUploadWidget from "../common/imageUpload/PhotoUploadWidget";

export default observer(function AboutUsAdmin() {
    const { aboutUsStore: { loadAboutUs, editAboutUs, aboutUs, uploading, uploadPhoto } } = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);

    function handlePhotoUpload(file: Blob) {
        uploadPhoto(file).then(()=>setAddPhotoMode(false));
    }

    useEffect(() => {
        loadAboutUs();
    }, [loadAboutUs]);
    return (
        <>
            <Segment.Group>
                <Segment clearing>
                    <Header as='h2'>About us</Header>
                    <Formik
                        enableReinitialize
                        initialValues={aboutUs}
                        onSubmit={(values, { setSubmitting }) => {
                            editAboutUs(values).then(() => setSubmitting(false));
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="ui form large">
                                <MyTextInput placeholder="Header" name="header" />
                                <MyTextArea placeholder="Description" name="body" rows={4} />

                                <Button positive floated="right" type="submit" content="Save" loading={isSubmitting} />
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