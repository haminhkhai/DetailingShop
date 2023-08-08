import React, { useEffect } from 'react';
import { Button, Container, Grid, Comment, Header, Segment, Image } from 'semantic-ui-react';
import ReactStars from 'react-rating-star-with-type';
import { useStore } from '../../stores/store';
import ReviewForm from './ReviewForm';
import { observer } from 'mobx-react-lite';
import { format } from 'date-fns';
import LoadingComponent from '../../layout/LoadingComponent';
import Slider from '../slider/Slider';

export default observer(function ReviewsShowCase() {
    const { modalStore, reviewStore: { loadReviewsShowcase, reviews, SortReviews, averageRating } } = useStore();

    useEffect(() => {
        if (reviews.length < 1) loadReviewsShowcase();
    }, [loadReviewsShowcase])

    return (
        <Segment basic style={{ padding: '8em 0 0 0', margin: '0' }}>
            <Container>
                <Grid stackable>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Header color='blue' as='h2'>
                                WHAT OUR CUSTOMERS SAY
                            </Header>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Button
                                onClick={() => { modalStore.openModal(<ReviewForm />, "large") }}
                                basic content='Write your review' />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            {averageRating &&
                                <ReactStars
                                    classNames='rating-star'
                                    valueShow={true}
                                    count={5}
                                    size={35}
                                    isEdit={false}
                                    value={Number.parseFloat(averageRating)}
                                    activeColors={["yellow"]}
                                />
                            }
                            <p className='review-count'>{reviews.length} reviews</p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Button onClick={() => SortReviews("newest")} basic content='newest' />
                            <Button onClick={() => SortReviews("highest")} basic content='highest' />
                            <Button onClick={() => SortReviews("lowest")} basic content='lowest' />
                        </Grid.Column>
                    </Grid.Row>
                    {reviews.map(review => (
                        <Grid.Row key={review.id}>
                            <Grid.Column width={16}>
                                <Comment.Group>
                                    <Header as='h3' dividing />
                                    <Comment>
                                        <Comment.Avatar src='./assets/user.png' />
                                        <Comment.Content>
                                            <Comment.Author as='a'>{review.name}</Comment.Author>
                                            <Comment.Metadata>
                                                <div>{format(review.date, "dd MMM yy h:mm aa")}</div>
                                            </Comment.Metadata>
                                            <Comment.Text>
                                                <ReactStars
                                                    value={review.rating}
                                                    isEdit={false}
                                                />
                                            </Comment.Text>
                                            <Comment.Text>{review.experience}</Comment.Text>
                                        </Comment.Content>
                                        <Comment.Content>
                                            {review.photos?.map(photo => (
                                                <Image style={{cursor:'pointer'}} key={photo.id}
                                                    floated='left' size='small'
                                                    src={photo.url || './assets/placeholder.png'}
                                                    onClick={() => modalStore.openModal(
                                                        <Slider predicate="gallery" srcs={review.photos!} selectedPhoto={photo.id} />, "small")}
                                                />
                                            ))}
                                        </Comment.Content>
                                    </Comment>
                                </Comment.Group>
                            </Grid.Column>
                        </Grid.Row>
                    ))}
                </Grid>
            </Container>
        </Segment>
    )
})