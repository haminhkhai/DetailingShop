import React from "react";
import { Button, Container, Grid, Icon, Segment, Table } from "semantic-ui-react";

export default function () {
    return (
        <Segment basic style={{padding:'0', margin:'0'}} className="add-on-option-container">
            <Grid doubling container verticalAlign="middle" className="add-on-option-wrapper" stackable>
                <Grid.Row>
                    <Grid.Column width={8}><span className="add-on-option-title">Tire Dressing</span></Grid.Column>
                    <Grid.Column width={6}>
                        <Icon className="add-on-option-icon" size="large" name="tag" />
                        <span className="add-on-option-price"> 4,95 $</span>
                    </Grid.Column>
                    <Grid.Column width={2}><Button basic color="blue" content='Select' /></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <span className="add-on-option-title">Trunk Vacuum</span>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Icon className="add-on-option-icon" size="large" name="tag" />
                        <span className="add-on-option-price"> 6,95 $</span>
                    </Grid.Column>
                    <Grid.Column width={2}><Button basic color="blue" content='Select' /></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <span className="add-on-option-title">Trunk Vacuum</span>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Icon className="add-on-option-icon" size="large" name="tag" />
                        <span className="add-on-option-price"> 6,95 $</span>
                    </Grid.Column>
                    <Grid.Column width={2}><Button basic color="blue" content='Select' /></Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
}