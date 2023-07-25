import React, { useEffect } from "react";
import { useStore } from "../stores/store";
import { Button, Grid, Header, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../layout/LoadingComponent";
import ServiceUser from "../features/booking/ServiceUser";

export default observer(function ServiceAdmin() {
    const { serviceStore: { services, loadServices, loadingInitial } } = useStore();

    useEffect(() => {
        if (services.length < 1) loadServices();
    }, [loadServices])

    if (loadingInitial) return <LoadingComponent content="Loading services..." />

    return (
        <>
            <Segment.Group>
                <Segment basic clearing>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Header as='h2'>Services</Header>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Button floated="right" basic as={Link}
                                    to={'/admin/createService'} content='Add Service' />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <ServiceUser services={services} predicate={"admin"} setService={() => { }} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Segment.Group>
        </>
    )
})