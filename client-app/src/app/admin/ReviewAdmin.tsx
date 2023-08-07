import { Card, Grid, Header, Segment, Button } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { HtmlHTMLAttributes, SyntheticEvent, useEffect, useState } from "react";
import Slider from "../features/slider/Slider";
import LoadingComponent from "../layout/LoadingComponent";
import { format } from "date-fns";

export default observer(function ReviewAdmin() {
    const { reviewStore: { loadReviews, reviews, setShow, loading, loadingInitial, deleteReview }, modalStore } = useStore();
    const [target, setTarget] = useState("");

    useEffect(() => {
        if (reviews.length <= 1) loadReviews();
    }, [reviews])

    function handleSetShow(predicate: string, id: string, e: SyntheticEvent<HTMLButtonElement>) {
        setShow(id);
        setTarget(e.currentTarget.name + "/" + predicate)
    }

    function handleDelete(id: string, e: SyntheticEvent<HTMLButtonElement>) {
        deleteReview(id);
        setTarget(e.currentTarget.name + "/delete")
    }

    if (loadingInitial) return <LoadingComponent content='Loading reviews...' />

    return (
        <Segment.Group>
            <Segment basic>
                <Grid doubling stackable>
                    <Grid.Column width={16}>
                        <Header as='h2'>Reviews</Header>
                    </Grid.Column>
                    {reviews.map(review => (
                        <Grid.Column width={8} key={review.id}>
                            <Card.Group>
                                <Card fluid>
                                    <Card.Content>
                                        {(review.photos && review.photos.length > 0) &&
                                            <Button
                                                onClick={() => {
                                                    modalStore.openModal(<Slider predicate="gallery" srcs={review.photos!} />, "large")
                                                }}
                                                style={{ float: 'right', padding: '0' }}
                                                icon="picture"
                                                size="massive"
                                            />
                                        }
                                        <Card.Header>{review.name}</Card.Header>
                                        <Card.Meta>{format(review.date, "dd MMM yy h:mm aa")}</Card.Meta>
                                        <Card.Meta>Rating: {review.rating}</Card.Meta>
                                        <Card.Description>
                                            {review.experience}
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Button
                                            name={review.id}
                                            positive={review.isShowed}
                                            onClick={e => handleSetShow("show", review.id, e)}
                                            loading={review.id === target.split('/')[0] && target.split('/')[1] === "show" && loading}
                                        >
                                            Show
                                        </Button>
                                        <Button
                                            name={review.id}
                                            positive={!review.isShowed}
                                            onClick={e => handleSetShow("hide", review.id, e)}
                                            loading={review.id === target.split('/')[0] && target.split('/')[1] === "hide" && loading}
                                        >
                                            Hide
                                        </Button>
                                        <Button
                                            color="red"
                                            floated="right"
                                            name={review.id}
                                            onClick={e => handleDelete(review.id, e)}
                                            loading={review.id === target.split('/')[0] && target.split('/')[1] === "delete" && loading}
                                        >
                                            Delete
                                        </Button>
                                    </Card.Content>
                                </Card>
                            </Card.Group>
                        </Grid.Column>
                    ))}
                </Grid>
            </Segment>
        </Segment.Group>
    )
})