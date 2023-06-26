import { Form, Formik } from "formik";
import React from "react";
import { Form as Form2, Button, Container, Segment } from "semantic-ui-react";
import { Booking } from "../../models/Booking";
import MyTextInput from "../../common/form/MyTextInput";
import MyDateInput from "../../common/form/MyDateInput";
import { Link } from "react-router-dom";
import { equal } from "assert";
import MyTextArea from "../../common/form/MyTextArea";

interface Props {
    activity: Booking;
}

export default function BookingForm() {
    const booking = new Booking({ name: "", tel: "", date: null, email: "", message: "" })
    return (
        <Segment basic style={{ padding: '0 0 9em 0', margin: '0' }}>
            <Container>
                <Formik
                    initialValues={booking}
                    enableReinitialize
                    onSubmit={() => { }}
                >
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                            <Form2.Group widths="equal">
                                <MyTextInput name='name' placeholder='Your name' />
                                <MyDateInput

                                    placeholderText='Select date and time to make a booking'
                                    name='date'
                                    showTimeSelect
                                    timeCaption="time"
                                    dateFormat='d MMMM, yyyy h:mm aa'
                                />
                            </Form2.Group>
                            <Form2.Group widths="equal">
                                <MyTextInput name='email' placeholder='Email' />
                                <MyTextInput name='tel' placeholder='Phone number' />
                            </Form2.Group>
                            <MyTextArea name='message' placeholder='Message' rows={3} />
                            <Button
                                disabled={isSubmitting || !dirty || !isValid}
                                loading={isSubmitting} floated="right"
                                positive type="submit" content="Submit" />
                            <Button as={Link} to='/booking' floated="right" type="button" content="Cancel" />
                        </Form>
                    )}
                </Formik>
            </Container>
        </Segment>
    )
}