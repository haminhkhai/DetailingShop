import { defaultMaxListeners } from "events";
import React from "react";
import { Container, Grid, Header, Icon, Segment } from "semantic-ui-react";

export default function ContactInfo() {
    return (
        <Segment basic className="contact-info-container" style={{ padding: '8em 0em',margin:'15px 0 0 0'}}>
            <Grid verticalAlign="middle" container textAlign="center" stackable doubling columns={3}>
                <Grid.Column>
                    <Grid>
                        <Grid.Column width={6} textAlign="right">
                            <Icon name='phone' size="huge" color="blue" />
                        </Grid.Column>
                        <Grid.Column width={10} textAlign="left">
                            <Header as='h3'>Call US AT</Header>
                            <span>(+505) 122 225 225</span>
                            <span>(+505) 122 225 224</span>
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
                <Grid.Column>
                    <Grid>
                        <Grid.Column width={6} textAlign="right">
                            <Icon name='map marker alternate' size="huge" color="blue" />
                        </Grid.Column>
                        <Grid.Column width={10} textAlign="left">
                            <Header as='h3'>OUR ADDRESS</Header>
                            <span>464 Rhode Island Av.</span>
                            <span>Portland, OR 97219</span>
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
                <Grid.Column>
                    <Grid>
                        <Grid.Column width={6} textAlign="right">
                            <Icon name='clock' size="huge" color="blue" />
                        </Grid.Column>
                        <Grid.Column width={10} textAlign="left">
                            <Header as='h3'>WORKING HOURS</Header>
                            <span>Monday – Friday: 8 am – 6 pm</span>
                            <span>Saturday: 8 am – 3 pm</span>
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
            </Grid>
        </Segment>
    )
}