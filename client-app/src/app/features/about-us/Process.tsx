import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import { Button, Container, Divider, Grid, Header, Icon, Label, Segment } from "semantic-ui-react";

export default function Process() {
    const isMobile = useMediaQuery({
        query: '(max-width: 992px)'
    })
    return (
        <>
            <div style={{padding:'0',margin:'0'}} className="process-booking-bar">
                <Container textAlign="center" style={{height:'100%'}}>
                    <span>SCHEDULE YOUR WASH NOW</span>
                    <Button 
                        as={NavLink}
                        to={'/booking'}
                        basic color="blue" 
                        content='BOOK APPOINTMENT' 
                    />
                </Container>
            </div>
            <Segment basic className="process-container" style={{ padding: '8em 0' }}>
                <Segment className='package-introducing' basic style={{ padding: '0em 0em 3em 0em' }}>
                    <Container text textAlign='center'>
                        <Header style={{ color: 'white' }} as='h1'>OUR PROCESS</Header>
                        <Divider style={{ border: '1px solid white' }} className='packages-divider' />
                        <span style={{ color: 'white' }}>We know your time is valuable</span>
                    </Container>
                </Segment>
                <Segment basic style={{ padding: '0em 0em', margin: '0' }}>
                    <Container>
                        <Grid className="process-grid" stretched>
                            <Grid.Column computer={3} tablet={16}>
                                <Grid textAlign="center">
                                    <Grid.Column style={{ display: 'flex' }} width={16}>
                                        <span className="process-circle">
                                            <span className="icon">t</span>
                                        </span>
                                    </Grid.Column>
                                    <Grid.Row>
                                        <Header as='h2' className="process-header">1. BOOKING</Header>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                            <Grid.Column computer={1} tablet={16} verticalAlign="middle" >
                                <div className="process-arrow-container">
                                    <span className="process-arrow-circle">
                                        {isMobile ? <Icon className="icon" name="arrow down" size="large" /> :
                                            <Icon className="icon" name="arrow right" size="large" />}

                                    </span>
                                </div>
                            </Grid.Column>
                            <Grid.Column computer={3} tablet={16}>
                                <Grid textAlign="center">
                                    <Grid.Column style={{ display: 'flex' }} width={16}>
                                        <span className="process-circle">
                                            <span className="icon">l</span>
                                        </span>
                                    </Grid.Column>
                                    <Grid.Row>
                                        <Header as='h2' className="process-header">2. INSPECTION</Header>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                            <Grid.Column computer={1} tablet={16} verticalAlign="middle">
                                <div className="process-arrow-container">
                                    <span className="process-arrow-circle">
                                        {isMobile ? <Icon className="icon" name="arrow down" size="large" /> :
                                            <Icon className="icon" name="arrow right" size="large" />}
                                    </span>
                                </div>
                            </Grid.Column>
                            <Grid.Column computer={3} tablet={16}>
                                <Grid textAlign="center">
                                    <Grid.Column style={{ display: 'flex' }} width={16}>
                                        <span className="process-circle">
                                            <span className="icon">{'}'}</span>
                                        </span>
                                    </Grid.Column>
                                    <Grid.Row>
                                        <Header as='h2' className="process-header">3. VALUATION</Header>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                            <Grid.Column computer={1} tablet={16} verticalAlign="middle">
                                <div className="process-arrow-container">
                                    <span className="process-arrow-circle">
                                        {isMobile ? <Icon className="icon" name="arrow down" size="large" /> :
                                            <Icon className="icon" name="arrow right" size="large" />}
                                    </span>
                                </div>
                            </Grid.Column>
                            <Grid.Column computer={3} tablet={16}>
                                <Grid textAlign="center">
                                    <Grid.Column style={{ display: 'flex' }} width={16}>
                                        <span className="process-circle">
                                            <span className="icon">?</span>
                                        </span>
                                    </Grid.Column>
                                    <Grid.Row>
                                        <Header as='h1' className="process-header">4. COMPLETION</Header>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                        </Grid>
                    </Container>
                </Segment>
            </Segment>
        </>
    )
}