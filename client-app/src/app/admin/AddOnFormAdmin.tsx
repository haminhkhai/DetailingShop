import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import MySelectInput from '../common/form/MySelectInput';
import MyTextArea from '../common/form/MyTextArea';
import MyTextInput from '../common/form/MyTextInput';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/store';
import { ServiceOptions } from '../models/service';
import { AddOn, AddOnFormValues } from '../models/addOn';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingComponent from '../layout/LoadingComponent';
import * as Yup from 'yup';

export default observer(function AddOnFormAdmin() {

    const { serviceStore: { loadServices, services },
        addOnStore: { createAddOn, loadAddOn, editAddOn, loadingInitial } } = useStore();
    const [serviceOptions, setServiceOptions] = useState<ServiceOptions[]>([]);
    const [addOn, setAddOn] = useState<AddOnFormValues>(new AddOnFormValues());
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (services.length === 0) {
            loadServices();
            setServiceOptions([]);
        }
        services.forEach(service => {
            setServiceOptions(current => [...current, new ServiceOptions(service)]);
        });
    }, [services])

    useEffect(() => {
        if (id && addOn.id === "") {
            loadAddOn(id).then((add) => {
                setAddOn(new AddOnFormValues(add));
            });
        }
    }, [addOn]);

    const validationSchema = Yup.object({
        name: Yup.string().required("Add-On name is required!"),
        price: Yup.number().typeError("Price must be a positive number")
            .positive("Price must be a positive number")
            .max(9999, "Price must be smaller or equal to 9999")
    })

    function handleFormSubmit(addOn: AddOnFormValues, setSubmitting: any, setValues: any) {
        if (!addOn.id) {
            var newAddOn = new AddOn({ ...addOn, id: uuidv4() });
            createAddOn(newAddOn).then(() => {
                setValues({ ...new AddOnFormValues, serviceId: addOn.serviceId });
                setSubmitting(false);
            });
        } else {
            editAddOn(new AddOn({ ...addOn })).then(() => {
                setSubmitting(false);
                // navigate('/admin/addOns');
            })
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading Add-Ons' />

    return (
        <>
            <Segment.Group>
                <Segment clearing>
                    <Header as='h2'>Add Add-On</Header>
                    <Formik
                        validateOnChange={false}
                        enableReinitialize
                        initialValues={addOn}
                        validationSchema={validationSchema}
                        onSubmit={
                            (values, { setSubmitting, setValues }) =>
                                handleFormSubmit(values, setSubmitting, setValues)
                        }
                    >
                        {({ handleSubmit, isSubmitting, isValid, dirty }) => (
                            <Form autoComplete='false' onSubmit={handleSubmit} className='ui form large'>
                                <MySelectInput options={serviceOptions} placeholder='Service' name='serviceId' />
                                <MyTextInput placeholder='Name' name='name' />
                                <MyTextInput placeholder='Price' name='price' />
                                <MyTextArea rows={3} name='description' placeholder='Description' />
                                <Button
                                    type='submit'
                                    disabled={isSubmitting || !isValid || !dirty}
                                    loading={isSubmitting} content='Submit'
                                    floated='right' positive
                                />
                                <Button
                                    onClick={() => navigate("/admin/addons")}
                                    type='reset'
                                    content='Cancel'
                                    floated='right' basic
                                />
                            </Form>
                        )}
                    </Formik>
                </Segment>
            </Segment.Group>
        </>
    )
})