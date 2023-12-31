import { useState } from "react";
import { Button, Card, Grid, Icon, Image } from "semantic-ui-react";
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
        <>
            {/* <Card.Group doubling stackable itemsPerRow={4}> */}
            {services.map(service => (
                <Grid.Column textAlign="center" mobile={16} tablet={5} computer={4} key={service.id}>
                    <Card centered={true} className="service-card">
                        <Card.Content className="price-container">
                            <Card.Header
                                style={{ fontSize: '15px' }}
                                className="service-name">{service.name}
                            </Card.Header>
                            <div className="price-wrapper">
                                <span className="price-currency">$</span>
                                <span className='price-unit'>{service.price}</span>
                                <span className='price-decimal'>{service.priceDecimal}</span>
                            </div>
                        </Card.Content>
                        <Image src={service.image || "/assets/placeholder-image.png"} wrapped ui={false} />
                        <Card.Content>
                            <Card.Description>
                                <p style={{ whiteSpace: 'pre-line' }}>{service.description}</p>
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
            {/* </Card.Group> */}
        </>
    )
})