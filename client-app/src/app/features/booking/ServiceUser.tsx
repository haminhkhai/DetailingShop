import React, { useState } from "react";
import { Button, Card, Grid, Icon, Image, Segment } from "semantic-ui-react";
import { Service } from "../../models/service";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";

interface Props {
    services: Service[];
    predicate: string;
    setService: (id: string, price: string) => void;
    selectedService?: string;
}

export default observer(function ServiceUser({ services, predicate,
    selectedService, setService }: Props) {

    const { serviceStore: { loading, deleteService } } = useStore();
    const [target, setTarget] = useState("");

    return (
        <Grid container doubling stackable columns={4} textAlign='center'>
            {services.map(service => (
                <Grid.Column key={service.id}>
                    <Card centered={true} className="service-card">
                        <Card.Content className="price-container">
                            <Card.Header
                                style={{ fontSize: '15px' }}
                                className="service-name">{service.name}
                            </Card.Header>
                            <div className="price-wrapper">
                                <span className="price-currency">$</span>
                                <span className='price-unit'>{service.price}</span>
                                <span className='price-decimal'>03</span>
                            </div>
                        </Card.Content>
                        <Image src={service.image || "../assets/placeholder-image.png"} wrapped ui={false} />
                        <Card.Content>
                            <Card.Description>
                                {service.description}
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            {
                                predicate === 'admin' ?
                                    <>
                                        <Button
                                            color="blue" content='Edit'
                                            as={Link} to={`/admin/manageService/${service.id}`} />
                                        <Button
                                            color="red" content='Delete'
                                            loading={loading && target === service.id}
                                            onClick={() => {
                                                setTarget(service.id)
                                                deleteService(service.id);
                                            }}
                                        />
                                    </> :
                                    <Button icon
                                        className={selectedService === service.id ? "active" : "basic"}
                                        color="blue"
                                        onClick={() => setService(service.id, service.price)}>
                                        <span>Book Now </span>
                                        {selectedService === service.id && <Icon name="check" />}
                                    </Button>
                            }
                        </Card.Content>
                    </Card>
                </Grid.Column>
            ))}
        </Grid>
    )
})