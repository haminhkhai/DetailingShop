import React, { useEffect, useState } from 'react'
import { Button, Card, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { useStore } from '../stores/store'
import LoadingComponent from '../layout/LoadingComponent';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';

export default observer(function BookingAdmin() {
    const { bookingStore: { loadingInitial, loadBookings, bookings, loading, deleteBooking } } = useStore();
    const [target, setTarget] = useState("");

    useEffect(() => {
        if (bookings.length < 1) loadBookings();
    }, [loadBookings])

    if (loadingInitial) return <LoadingComponent content='Loading bookings...' />

    return (
        <Segment.Group>
            <Segment basic>
                <Header as='h2' content='Bookings' />
                <Grid doubling stackable>
                    <Grid.Column width={16}>
                        <Card.Group>
                            {bookings.map(booking => (
                                <Card key={booking.id} fluid>
                                    <Card.Content>
                                        <Grid>
                                            <Grid.Column width={8}>
                                                <Header>{booking.name}</Header>
                                            </Grid.Column>
                                            <Grid.Column width={8}>
                                                <Header floated='right'>{booking.total} $</Header>
                                            </Grid.Column>
                                        </Grid>
                                        <Card.Meta className='booking-info'>
                                            {booking.email} - {booking.tel}
                                        </Card.Meta>
                                        <Card.Meta className='booking-info'>
                                            Date created: {format(booking.date!, "dd MMM yy h:mm aa")}
                                        </Card.Meta>
                                    </Card.Content>
                                    <Card.Content>
                                        <Message positive attached>
                                            <Message.Header>Details</Message.Header>
                                            <Message.List>
                                                <Message.Item>
                                                    <Card.Meta className='booking-info'>
                                                        Booking date: {format(booking.bookingDate!, "dd MMM yy h:mm aa")}
                                                    </Card.Meta>
                                                </Message.Item>
                                                <Message.Item>
                                                    <Card.Meta className='booking-info'>
                                                        Vehicle type: {booking.service.vehicleType}
                                                    </Card.Meta>
                                                </Message.Item>
                                                <Message.Item>
                                                    <Card.Meta className='booking-info'>
                                                        Service: {booking.service.name}
                                                    </Card.Meta>
                                                </Message.Item>
                                                <Message.Item>
                                                    <Card.Meta className='booking-info'>
                                                        Message: {booking.message}
                                                    </Card.Meta>
                                                </Message.Item>
                                            </Message.List>
                                        </Message>
                                        {booking.bookingAddOns.length > 0 &&
                                            <Message attached positive>
                                                <Message.Header>Add-Ons</Message.Header>
                                                <Message.List>
                                                    {booking.bookingAddOns.map(bookingAddOn => (
                                                        <Message.Item key={bookingAddOn.id}>
                                                            <Card.Meta className='booking-info'>
                                                                {bookingAddOn.name + " - " + bookingAddOn.price + ' $'}
                                                            </Card.Meta>
                                                        </Message.Item>
                                                    ))}
                                                </Message.List>
                                            </Message>
                                        }
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Button
                                            color='red'
                                            onClick={() => {
                                                deleteBooking(booking.id);
                                                setTarget(booking.id);
                                            }}
                                            loading={loading && target === booking.id}
                                            floated="right"
                                        >
                                            Delete
                                        </Button>
                                    </Card.Content>
                                </Card>
                            ))}
                        </Card.Group>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})