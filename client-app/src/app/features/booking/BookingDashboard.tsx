import React from "react";
import { Container, Grid, Header, Segment } from "semantic-ui-react";
import ServiceDashboard from "../services/ServiceDashboard";
import VehicleType from "./VehicleType";
import StepHeader from "./StepHeader";
import AddOnOption from "./AddOnOption";
import MyDateInput from "../../common/form/MyDateInput";
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import BookingForm from "./BookingForm";
import CoverSlogan from "../cover slogan/CoverSlogan";

export default function BookingDashboard() {
    return (
        <>
            <CoverSlogan slogan={'SCHEDULE YOUR WASH'} image={'./assets/sliderImages/Detail2.jpeg'} />
            <StepHeader stepNo={1} title="VEHICLE TYPE"
                subTitle="Select vehicle type below." />

            <VehicleType />

            <StepHeader stepNo={2} title="SERVICE PACKAGES"
                subTitle="which service is best for your vehicle" />

            <ServiceDashboard isBookingPage={true} />

            <StepHeader stepNo={3} title="ADD-ON OPTIONS"
                subTitle="Add services to your package." />

            <AddOnOption />

            <StepHeader stepNo={4} title="BOOKING SUMMARY"
                subTitle="Please provide us with your contact information." />

            <BookingForm />

        </>
    )
}