import { useEffect, useState } from 'react';
import NavBar from '../../layout/NavBar';
import Slider from '../slider/Slider';
import ContactInfo from '../info/ContactInfo';
import MapReveal from '../info/MapReveal';
import { Container, Divider, Grid, Header, Segment } from 'semantic-ui-react';
import Footer from '../../layout/footer/Footer';
import AboutUsHome from '../about-us/AboutUsHome';
import VehicleType from '../booking/VehicleType';
import { Photo } from '../../models/photo';
import ServiceUser from '../booking/ServiceUser';
import { Booking } from '../../models/booking';
import { Service, vehicleTypeOptions } from '../../models/service';
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from '../../layout/LoadingComponent';

export default observer(function HomePage() {
    const { serviceStore: { servicesByVehicleType, services, loadServices, loadingInitial },
        bookingStore: { selectedBooking, setSelectedBooking },
        carouselStore: { carousels, loadCarousels, prepareSlider } } = useStore();
    const [booking, setBooking] = useState<Booking>(new Booking());
    const [srcs, setSrcs] = useState<Photo[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (services.length <= 1) loadServices();
        if (selectedBooking) setBooking(selectedBooking);
        else setVehicleType(vehicleTypeOptions[0].value);
    }, [services])

    useEffect(() => {
        if (carousels.length < 1) loadCarousels();
        // setSrcs(prepareSlider(carousels))
    }, [carousels])

    const setVehicleType = (vehicleType: string) => {
        setBooking(current => {
            if (current.service.vehicleType === vehicleType)
                return new Booking({
                    ...current,
                    total: "0",
                    bookingAddOns: [],
                    service: new Service()
                });
            else
                return new Booking({
                    ...current,
                    total: "0",
                    bookingAddOns: [],
                    service: new Service({ ...current.service, id: "", vehicleType: vehicleType })
                });
        })
    }

    const setService = (id: string, price: string) => {

        const newBooking = new Booking({
            ...booking,
            total: price + " $",
            bookingAddOns: [],
            service: new Service({ ...booking.service, id: id, price: price })
        });
        setSelectedBooking(newBooking);
        navigate('/booking');
    }



    if (loadingInitial) return <LoadingComponent content='Loading page...' />


    return (

        <>
            <NavBar predicate='user' />

            <Slider predicate='carousel' srcs={prepareSlider(carousels)} />

            <AboutUsHome />
            <Segment className='package-introducing' basic style={{ padding: '0em 0em 5em 0em' }}>
                <Container text textAlign='center'>
                    <Header as='h1'>SERVICE PACKAGES</Header>
                    <Divider className='packages-divider' />
                    <span>Which packages is the best for your vehicle</span>
                </Container>
            </Segment>

            <VehicleType vehicleType={booking.service.vehicleType}
                setVehicleType={setVehicleType} style={{ padding: '0' }} />
            <Segment basic style={{ padding: '5em 0 0 0' }}>
                <Grid container>
                <ServiceUser selectedService={booking.service.id}
                    setService={setService}
                    services={servicesByVehicleType(booking.service.vehicleType)}
                    predicate={"user"}
                />
                </Grid>
            </Segment>


            <ContactInfo />
            <MapReveal />
            <Footer />
        </>
    )
})