import React from "react";
import { Container, Grid, Segment } from "semantic-ui-react";

export default function VehicleType() {
    return (
        <Segment basic style={{padding:'0', margin:'0'}} className="vehicle-type-container" >
            <Grid container className="vehicle-type-wrapper" textAlign="center" doubling columns={6}>
                <Grid.Column>
                    <div className="vehicle-type-button">
                        <div className="cbs-vehicle-icon cbs-vehicle-icon-small-car">
                            b
                        </div>
                        <span>Regular Size Car</span>
                    </div>
                </Grid.Column>
                <Grid.Column>
                    <div className="vehicle-type-button">
                        <div className="cbs-vehicle-icon cbs-vehicle-icon-small-car">
                            c
                        </div>
                        <span>Medium Size Car</span>
                    </div>
                </Grid.Column>
                <Grid.Column>
                    <div className="vehicle-type-button">
                        <div className="cbs-vehicle-icon cbs-vehicle-icon-small-car">e</div>
                        <span>Compact SUV</span>
                    </div>
                </Grid.Column>
                <Grid.Column>
                    <div className="vehicle-type-button">
                        <div className="cbs-vehicle-icon cbs-vehicle-icon-small-car">j</div>
                        <span>Minivan</span>
                    </div>
                </Grid.Column>
                <Grid.Column>
                    <div className="vehicle-type-button">
                        <div className="cbs-vehicle-icon cbs-vehicle-icon-small-car">g</div>
                        <span>Pickup Truck</span>
                    </div>
                </Grid.Column>
                <Grid.Column>
                    <div className="vehicle-type-button">
                        <div className="cbs-vehicle-icon cbs-vehicle-icon-small-car">k</div>
                        <span>Cargo Truck</span>
                    </div>
                </Grid.Column>
            </Grid>
        </Segment>
    )
}