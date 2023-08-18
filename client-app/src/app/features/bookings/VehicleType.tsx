import { Grid, Segment } from "semantic-ui-react";
import { vehicleTypeOptions } from "../../models/service";

interface Props {
    style: object;
    setVehicleType: (vehicleType: string) => void;
    vehicleType: string;
}

export default function VehicleType({ style, setVehicleType, vehicleType }: Props) {
    return (
        <Segment basic style={style} className="vehicle-type-container" >
            <Grid container className="vehicle-type-wrapper" textAlign="center" doubling columns={6}>
                {/* <Grid.Column>
                    <div data-name="minivan" onClick={()=>setTarget("minivan")} 
                        className={target === "minivan" ? "vehicle-type-button active" : "vehicle-type-button"}>
                        <div className="cbs-vehicle-icon cbs-vehicle-icon-small-car">
                            b
                        </div>
                        <span>Regular Size Car</span>
                    </div>
                </Grid.Column> */}

                {vehicleTypeOptions.map((option) => (
                    <Grid.Column key={option.value}>
                        <div onClick={() => { setVehicleType(option.value) }}
                            className={vehicleType === option.value ? "vehicle-type-button active" : "vehicle-type-button"}>
                            <div className="cbs-vehicle-icon cbs-vehicle-icon-small-car">
                                {option.icons}
                            </div>
                            <span>{option.text}</span>
                        </div>
                    </Grid.Column>
                ))}
            </Grid>
        </Segment>
    )
}