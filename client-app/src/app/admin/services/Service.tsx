import { Fragment, useEffect } from "react";
import { useStore } from "../../stores/store";
import { Button, Divider, Grid, Header, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../layout/LoadingComponent";
import ServiceUser from "../../features/bookings/ServiceUser";

export default observer(function Service() {
    const { serviceStore: { services, loadServices, groupServices, loadingInitial } } = useStore();

    useEffect(() => {
        if (services.length <= 1) loadServices();
    }, [])

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
                                <Button
                                    icon='add'
                                    floated="right" basic as={Link}
                                    to={'/admin/createService'} content='Add Service'
                                />
                            </Grid.Column>
                        </Grid.Row>
                        {groupServices.map(([group, services], i) => (
                            <Fragment key={group}>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <Header color='teal' as='h3' content={group} />
                                    </Grid.Column>
                                </Grid.Row>

                                <ServiceUser services={services} predicate={"admin"} setService={() => { }} />

                                {/* {(i < groupServices.length - 1) && <Divider />} */}
                            </Fragment>
                        ))}
                    </Grid>
                </Segment>
            </Segment.Group>
        </>
    )
})