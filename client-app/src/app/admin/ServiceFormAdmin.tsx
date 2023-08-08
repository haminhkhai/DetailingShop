import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Grid, Header, Label, Progress, Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { Service, vehicleTypeOptions, } from "../models/service";
import MyTextInput from "../common/form/MyTextInput";
import MySelectInput from "../common/form/MySelectInput";
import MyTextArea from "../common/form/MyTextArea";
import 'cropperjs/dist/cropper.css';
import PhotoWidgetDropzone from "../common/imageUpload/PhotoWidgetDropzone";
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { SUPPORTED_FORMATS } from "../models/photo";

export default observer(function ServiceFormAdmin() {
    const { serviceStore: { createService, loading, loadService, editService, progress } } = useStore();
    const [service, setService] = useState<Service>(new Service());
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    //dispose file.preview after using
    useEffect(() => {
        if (id && service.id == "") loadService(id).then((sv) => {
            setService(new Service(sv));
            setFiles([{ preview: sv?.image, imageId: sv?.imageId, type: 'image/jpeg' }]);
        })
    }, [id])

    useEffect(() => {
        fileValidation(files);
        //dispose file.preview after using
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview))
        }
    }, [files])

    const validationSchema = Yup.object({
        vehicleType: Yup.string().required("Vehicle type is required"),
        name: Yup.string().required("Name is required"),
        price: Yup.number().typeError("Price must be a positive number")
            .positive("Price must be a positive number")
            .max(9999, "Price must be smaller or equal to 9999")
    })

    const handleFormSubmit = async (service: Service, setSubmitting: any, setValues: any) => {
        if (cropper && cropper.getCroppedCanvas() && files[0].imageId !== service.imageId) {
            cropper.getCroppedCanvas().toBlob(blob => {
                if (!service.id)
                    createService(blob, { ...service, id: uuidv4() }).then(() => {
                        setSubmitting(false);
                        setValues({ ...new Service(), vehicleType: service.vehicleType });
                        setCropper(undefined);
                        setFiles([]);
                    });
                else
                    editService(blob, service).then(() => setSubmitting(false));
            }, 'image/jpeg');
        } else {
            if (!service.id)
                createService(null, { ...service, id: uuidv4() }).then(() => {
                    setSubmitting(false);
                    setValues({ ...new Service(), vehicleType: service.vehicleType });
                });
            else
                editService(null, service).then(() => setSubmitting(false));
        }
    }

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

    return (
        <Segment.Group>
            <Segment basic clearing>
                {progress > 0 && <Progress attached="top" percent={progress} />}
                <Header as='h2'>{service.id ? 'Edit Service' : 'Add Service'}</Header>
                <Formik
                    validateOnChange={false}
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={service}
                    onSubmit={
                        (values, { setSubmitting, setValues }) => {
                            handleFormSubmit(values, setSubmitting, setValues)
                        }}
                >
                    {
                        ({ isSubmitting }) => (
                            <Form className="ui form large">
                                <MySelectInput placeholder='Vehicle Type' name='vehicleType'
                                    options={vehicleTypeOptions} />
                                <MyTextInput placeholder='Name' name='name' />
                                <MyTextInput placeholder='Price' name='price' />
                                <MyTextArea placeholder='Description' name='description' rows={3} />
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
                                    disabled={error !== "" || isSubmitting}
                                    type="submit" content='Submit'
                                    loading={isSubmitting} positive floated="right" />
                                <Button type="reset" content='Cancel'
                                    onClick={() => {
                                        setError("");
                                        setFiles([]);
                                        navigate('/admin/services');
                                    }} basic floated="right" />
                            </Form>
                        )
                    }
                </Formik>
                <br />
            </Segment>
        </Segment.Group>
    )
})