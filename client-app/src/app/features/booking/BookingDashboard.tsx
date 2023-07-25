import VehicleType from "./VehicleType";
import StepHeader from "./StepHeader";
import CoverSlogan from "../cover slogan/CoverSlogan";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { useEffect, useState } from "react";
import { Booking } from "../../models/booking";
import { Service } from "../../models/service";
import ServiceUser from "./ServiceUser";
import AddOnUser from "./AddOnUser";
import LoadingComponent from "../../layout/LoadingComponent";
import { AddOnFormValues } from "../../models/addOn";
import { Form, Formik } from "formik";
import MyTextInput from "../../common/form/MyTextInput";
import MyDateInput from "../../common/form/MyDateInput";
import MyTextArea from "../../common/form/MyTextArea";
import { Button, Container, Form as Form2, Segment } from "semantic-ui-react";

export default observer(function BookingDashboard() {
    const { serviceStore: { loadServices, servicesByVehicleType, services, loadingInitial },
        addOnStore: { addOns, loadAddOns, addOnByService },
        bookingStore: { createBooking } } = useStore();
    const [booking, setBooking] = useState<Booking>(new Booking());

    useEffect(() => {
        if (services.length < 1) loadServices();
        if (addOns.length < 1) loadAddOns();
    }, [loadServices, loadAddOns]);

    const setVehicleType = (vehicleType: string) => {
        setBooking(current => {
            if (current.service.vehicleType === vehicleType)
                return new Booking({
                    ...current,
                    bookingAddOns: [],
                    service: new Service()
                });
            else
                return new Booking({
                    ...current,
                    bookingAddOns: [],
                    service: new Service({ ...current.service, id: "", vehicleType: vehicleType })
                });
        })
    }

    const setService = (id: string, price: string) => {
        setBooking(current => {
            if (current.service.id === id)
                return new Booking({
                    ...current,
                    total: "0",
                    bookingAddOns: [],
                    service: new Service({ ...current.service, id: "" })
                });
            else
                return new Booking({
                    ...current,
                    total: price + " $",
                    bookingAddOns: [],
                    service: new Service({ ...current.service, id: id, price: price })
                });
        })
    }

    const setAddOn = (addOn: AddOnFormValues) => {
        setBooking(current => {
            if (current.bookingAddOns.find(a => a.id === addOn.id)) {
                const filteredBookingAddOns = current.bookingAddOns.filter(a => a.id != addOn.id);
                return new Booking({
                    ...current,
                    total: calculateTotalPrice(filteredBookingAddOns, current.service.price),
                    bookingAddOns: filteredBookingAddOns
                });
            } else {
                const newBookingAddOns = [...current.bookingAddOns, addOn];
                return new Booking({
                    ...current,
                    total: calculateTotalPrice(newBookingAddOns, current.service.price),
                    bookingAddOns: newBookingAddOns
                });
            }
        })
    }

    const calculateTotalPrice = (addons: AddOnFormValues[], servicePrice: string) => {
        var total = "0";
        const sumCurrentAddOnPrice = addons.reduce((sum, addOn) => sum + Number.parseFloat(addOn.price), 0);
        let sumAddOnAndServicePrice = 0;
        sumAddOnAndServicePrice = sumCurrentAddOnPrice + Number.parseFloat(servicePrice);
        total = sumAddOnAndServicePrice.toString() + " $";
        return total;
    }

    const handleSubmit = (bookingForm: Booking, setSubmitting: any, setValues: any) => {
        const newBooking = new Booking({ ...bookingForm, total: bookingForm.total.split(' ')[0], bookingAddOns: booking.bookingAddOns, service: booking.service });
        createBooking(newBooking).then(() => {
            setSubmitting(false);
            setValues(new Booking());
            setBooking(new Booking());
        });
    }

    if (loadingInitial) return <LoadingComponent content="Loading..." />

    return (
        <>
            <CoverSlogan slogan={'SCHEDULE YOUR WASH'}
                image={'./assets/sliderImages/Detail2.jpeg'} />
            <StepHeader stepNo={1} title="VEHICLE TYPE"
                subTitle="Select vehicle type below." />

            <VehicleType vehicleType={booking.service.vehicleType}
                setVehicleType={setVehicleType} style={{ padding: '0' }} />

            <StepHeader stepNo={2} title="SERVICE PACKAGES"
                subTitle="which service is best for your vehicle" />

            <ServiceUser selectedService={booking.service.id} setService={setService} services={servicesByVehicleType(booking.service.vehicleType)} predicate={"user"} />

            <StepHeader stepNo={3} title="ADD-ON OPTIONS"
                subTitle="Add services to your package." />

            <AddOnUser selectedAddOns={booking.bookingAddOns} setAddOn={setAddOn} addOns={addOnByService(booking.service.id)} />

            <StepHeader stepNo={4} title="BOOKING SUMMARY"
                subTitle="Please provide us with your contact information." />
            <Segment basic style={{ padding: '0 0 6em 0', margin: '0' }}>
                <Container>
                    <Formik
                        enableReinitialize
                        initialValues={booking}
                        onSubmit={(values, { setSubmitting, setValues }) =>
                            handleSubmit(values, setSubmitting, setValues)}
                    >
                        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                            <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                                <Form2.Group widths="equal">
                                    <MyTextInput name='name' placeholder='Your name (*)' />
                                    <MyDateInput
                                        placeholderText='Select date and time to make a booking (*)'
                                        name='bookingDate'
                                        showTimeSelect
                                        timeCaption="time"
                                        dateFormat='d MMMM, yyyy h:mm aa'
                                    />
                                </Form2.Group>
                                <Form2.Group widths="equal">
                                    <MyTextInput name='email' placeholder='Email (*)' />
                                    <MyTextInput name='tel' placeholder='Phone number (*)' />
                                    <MyTextInput name='total' readOnly placeholder='Total price' />
                                </Form2.Group>
                                <MyTextArea name='message' placeholder='Message' rows={3} />
                                <Button
                                    disabled={isSubmitting || !dirty || !isValid}
                                    loading={isSubmitting} floated="right"
                                    positive type="submit" content="Submit" />
                                <Button floated="right" type="reset" content="Cancel" />
                            </Form>
                        )}
                    </Formik>
                </Container>
            </Segment>
        </>
    )
})