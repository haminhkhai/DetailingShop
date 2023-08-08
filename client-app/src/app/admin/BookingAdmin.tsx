import { useEffect, useState } from 'react'
import { Card, Grid, Header, Loader, Segment } from 'semantic-ui-react'
import { useStore } from '../stores/store'
import { observer } from 'mobx-react-lite';
import { PagingParams } from '../models/pagination';
import InfiniteScroll from 'react-infinite-scroller';
import BookingItemPlaceHolder from './BookingItemPlaceHolder';
import BookingItem from './BookingItem';

export default observer(function BookingAdmin() {
    const { bookingStore:
        { loadingInitial, loadBookings, bookings, loading,
            deleteBooking, setPagingParams, pagination } } = useStore();
    const [target, setTarget] = useState("");
    const [loadingNext, setLoadingNext] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadBookings().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        if (bookings.length === 0) loadBookings();
    }, [bookings])

    // if (loadingInitial && !loadingNext) return <LoadingComponent content='Loading bookings...' />

    return (
        <Segment.Group>
            <Segment basic>
                <Grid doubling stackable>
                    <Grid.Column width={16}>
                        <Header as='h2' content='Bookings' />
                    </Grid.Column>
                    <Grid.Column width={16}>
                        {loadingInitial && !loadingNext ?
                            (<>
                                <BookingItemPlaceHolder />
                                <BookingItemPlaceHolder />
                                <BookingItemPlaceHolder />
                            </>) : <>

                                <InfiniteScroll
                                    className='sokratis'
                                    pageStart={0}
                                    loadMore={handleGetNext}
                                    hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                                    initialLoad={false}
                                >
                                    <Card.Group>
                                        {bookings.map(booking => (
                                            <BookingItem booking={booking} />
                                        ))}
                                    </Card.Group>
                                </InfiniteScroll>
                            </>
                        }
                    </Grid.Column>
                    {/* <Grid.Column width={16}> */}
                    <Loader active={loadingNext} />
                    {/* </Grid.Column> */}
                </Grid>
            </Segment>
        </Segment.Group>
    )
})