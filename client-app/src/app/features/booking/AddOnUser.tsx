import { Button, Grid, Icon, Segment } from "semantic-ui-react";
import { AddOnFormValues } from "../../models/addOn";
import { useState } from "react";

interface Props {
    addOns: AddOnFormValues[];
    setAddOn: (addOn: AddOnFormValues) => void;
    selectedAddOns?: AddOnFormValues[];
}

export default function AddOnUser({ addOns, setAddOn, selectedAddOns}: Props) {
    const [target, setTarget] = useState("");
    return (
        <Segment basic style={{ padding: '0', margin: '0' }} className="add-on-option-container">
            <Grid doubling container verticalAlign="middle" className="add-on-option-wrapper" stackable>
                {addOns.map((addOn) => (
                    <Grid.Row key={addOn.id}>
                        <Grid.Column width={8}>
                            <span className="add-on-option-title">{addOn.name}</span>
                            <br />
                            <span>{addOn.description}</span>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Icon className="add-on-option-icon" size="large" name="tag" />
                            <span className="add-on-option-price"> {addOn.price} $</span>
                        </Grid.Column>
                        <Grid.Column width={2}>
                            <Button
                                className={selectedAddOns?.find(a => a.id === addOn.id)  ? "active" : "basic"}
                                onClick={() => {
                                    setTarget(addOn.id);
                                    setAddOn(addOn);
                                }}
                                color="blue" icon>
                                <span>Select  </span>
                                {selectedAddOns?.find(a => a.id === addOn.id) && <Icon name="check" />}
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                ))}
            </Grid>
        </Segment>
    )
}