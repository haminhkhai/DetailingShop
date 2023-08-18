import VehicleType from "./VehicleType";
import StepHeader from "./StepHeader";
import CoverSlogan from "../cover slogans/CoverSlogan";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { useEffect, useRef, useState } from "react";
import { Booking } from "../../models/booking";
import { Service } from "../../models/service";
import ServiceUser from "./ServiceUser";
import AddOnUser from "./AddOnUser";
import { AddOnFormValues } from "../../models/addOn";
import { Form, Formik } from "formik";
import MyTextInput from "../../common/form/MyTextInput";
import MyDateInput from "../../common/form/MyDateInput";
import MyTextArea from "../../common/form/MyTextArea";
import { Button, Container, Form as Form2, Grid, Segment } from "semantic-ui-react";
import * as Yup from 'yup';
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha"

export default observer(function BookingDashboard() {
    const { serviceStore: { loadServices, servicesByVehicleType, services },
        addOnStore: { addOns, loadAddOns, addOnByService },
        bookingStore: { createBooking, selectedBooking, setSelectedBooking, loading } } = useStore();
    const [booking, setBooking] = useState<Booking>(new Booking());
    const [captchaPass, setCaptchaPass] = useState(false);

    useEffect(() => {
        if (services.length < 1) loadServices();
        if (selectedBooking) setBooking(selectedBooking);
    }, []);

    useEffect(() => {
        if (addOns.length < 1) loadAddOns();
    }, [])

    const captchaRef = useRef<ReCAPTCHA>(null)

    const setVehicleType = (vehicleType: string) => {

        const unselectedVehicleType = new Booking({
            ...booking,
            total: "0",
            bookingAddOns: [],
            service: new Service()
        });

        const newVehicleType = new Booking({
            ...booking,
            total: "0",
            bookingAddOns: [],
            service: new Service({ ...booking.service, id: "", vehicleType: vehicleType })
        });
        //setBooking
        setBooking(current => {
            if (current.service.vehicleType === vehicleType) return unselectedVehicleType;
            else return newVehicleType;
        })
        //set selectedBooking
        if (selectedBooking?.service.vehicleType === vehicleType) setSelectedBooking(unselectedVehicleType);
        else setSelectedBooking(newVehicleType);

    }

    const setService = (id: string, price: string) => {

        const unselectedService = new Booking({
            ...booking,
            total: "0",
            bookingAddOns: [],
            service: new Service({ ...booking.service, id: "" })
        });

        const newService = new Booking({
            ...booking,
            total: price + " $",
            bookingAddOns: [],
            service: new Service({ ...booking.service, id: id, price: price })
        });

        setBooking(current => {
            if (current.service.id === id) return unselectedService;
            else return newService;
        })

        if (selectedBooking?.service.id === id) setSelectedBooking(unselectedService);
        else setSelectedBooking(newService);
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

    const handleSubmit = async (bookingForm: Booking, setValues: any) => {
        let token = "";
        token = captchaRef.current?.getValue()!;

        if (token === "") {
            toast.error("Please tick captcha box to submit your booking");
            return;
        }

        bookingForm.captchaToken = token;

        if (bookingForm.total.indexOf('$') === -1) {
            toast.error("Please scroll up and choose your vehicle type and service for your booking");
            return;
        }

        const newBooking = new Booking({
            ...bookingForm, total: bookingForm.total.split(' ')[0],
            bookingAddOns: booking.bookingAddOns, service: booking.service
        });
        createBooking(newBooking).then(() => {
            setCaptchaPass(false);
            captchaRef.current?.reset();
            setValues({ ...new Booking(), service: { ...new Service(), vehicleType: booking.service.vehicleType } });
            setBooking({ ...new Booking(), service: { ...new Service(), vehicleType: booking.service.vehicleType } });
        });
    }

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const validationSchema = Yup.object({
        name: Yup.string().required("Your name is required"),
        bookingDate: Yup.date().required("Booking date is required"),
        email: Yup.string().email().required("Your email is required"),
        tel: Yup.string().required("Phone number is required").matches(phoneRegExp, 'Phone number is not valid')
    })

    const onCaptchaChange = async (value: string | null) => {
        if (value) {
            setCaptchaPass(true);
        }
        else {
            setCaptchaPass(false);
        }
    }

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
            <Grid container>
                <ServiceUser selectedService={booking.service.id}
                    setService={setService}
                    services={servicesByVehicleType(booking.service.vehicleType)}
                    predicate={"user"}
                />
            </Grid>

            <StepHeader stepNo={3} title="ADD-ON OPTIONS"
                subTitle="Add services to your package." />

            <AddOnUser selectedAddOns={booking.bookingAddOns} setAddOn={setAddOn} addOns={addOnByService(booking.service.id)} />

            <StepHeader stepNo={4} title="BOOKING SUMMARY"
                subTitle="Please provide us with your contact information." />
            <Segment clearing basic style={{ padding: '0 0 0 0', margin: '0' }}>
                <Container>
                    <Formik

                        validationSchema={validationSchema}
                        enableReinitialize
                        initialValues={booking}
                        onSubmit={(values, { setValues }) =>
                            handleSubmit(values, setValues)}
                    >
                        {({ handleSubmit, values }) => (
                            <Form
                                onBlur={() => {
                                    setBooking(current =>
                                        new Booking({
                                            ...values, service: current.service, bookingAddOns: current.bookingAddOns,
                                            total: current.total
                                        }))
                                }}
                                className="ui form"
                                onSubmit={handleSubmit} autoComplete="off">
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
                                <ReCAPTCHA
                                    style={{ float: 'right' }}
                                    sitekey={process.env.REACT_APP_SITE_KEY!}
                                    ref={captchaRef}
                                    onChange={onCaptchaChange}
                                />
                                <div style={{ width: '100%', display: 'inline-block', padding: '15px 0 0 0' }}>
                                    <Button
                                        disabled={loading || !captchaPass}
                                        loading={loading} floated="right"
                                        positive type="submit" content="Submit" />
                                    <Button
                                        onClick={() => {
                                            setBooking(new Booking({
                                                ...new Booking, service: { ...booking.service, id: "" }
                                            }));
                                        }}
                                        floated="right" type="reset" content="Cancel" />
                                </div>

                            </Form>
                        )}
                    </Formik>
                </Container>
            </Segment>
        </>
    )
})