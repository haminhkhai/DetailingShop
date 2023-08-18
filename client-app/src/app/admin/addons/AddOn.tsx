import { Fragment, SyntheticEvent, useEffect, useState } from 'react';
import { Button, Card, Grid, Header, Segment, Select } from 'semantic-ui-react';
import { useStore } from '../../stores/store';
import LoadingComponent from '../../layout/LoadingComponent';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { vehicleTypeOptions } from '../../models/service';

export default observer(function AddOn() {
    const { addOnStore: { addOns, loadAddOns, groupAddOns,
        deleteAddOn, setAddOnsByVehicleType, loadingInitial, loading } } = useStore();
    const [target, setTarget] = useState("");

    useEffect(() => {
        if (addOns.length <= 1) loadAddOns();
        setAddOnsByVehicleType('regular size car');
    }, [addOns])

    function handleDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteAddOn(id);
    }

    if (loadingInitial) return <LoadingComponent content='Loading add-ons' />

    return (
        <Segment.Group>
            <Segment basic>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Header as='h2'>Add-Ons</Header>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Button
                                icon='add'
                                floated="right" basic as={Link}
                                to={'/admin/createAddOn'} content='Add Add-On'
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Select
                                defaultValue={vehicleTypeOptions[0].value}
                                options={vehicleTypeOptions}
                                onChange={(e) => setAddOnsByVehicleType(e.currentTarget.innerText.toLocaleLowerCase())}
                                placeholder={"Choose vehicle type"}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    {
                        groupAddOns.map(([group, addOns]) => (
                            <Fragment key={group}>
                                <Grid.Row>
                                    <Grid.Column width={16}>
                                        <Header color='teal' as='h3' content={group} />
                                    </Grid.Column>

                                </Grid.Row>
                                {addOns.map(addOn => (
                                    <Grid.Column computer={8} tablet={8} mobile={16} key={addOn.id}>
                                        <Card.Group>
                                            <Card fluid>
                                                <Card.Content>
                                                    <Card.Header>{addOn.name}</Card.Header>
                                                    <Card.Meta>Price: {addOn.price}</Card.Meta>
                                                    <Card.Description>
                                                        {addOn.description}
                                                    </Card.Description>
                                                </Card.Content>
                                                <Card.Content extra>
                                                    <Button
                                                        color='red'
                                                        floated="right"
                                                        name={addOn.id}
                                                        onClick={e => handleDelete(e, addOn.id)}
                                                        loading={target == addOn.id && loading}
                                                    >
                                                        Delete
                                                    </Button>
                                                    <Button
                                                        color='blue'
                                                        floated='right'
                                                        as={Link}
                                                        to={`/admin/manageAddOn/${addOn.id}`}
                                                    >
                                                        Edit
                                                    </Button>

                                                </Card.Content>
                                            </Card>
                                        </Card.Group>
                                    </Grid.Column>
                                ))}
                            </Fragment>
                        ))
                    }
                </Grid>
            </Segment>
        </Segment.Group>
    )
})
