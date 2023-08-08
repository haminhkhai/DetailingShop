import { useEffect, useState } from "react";
import { Grid, Header, Segment, Image } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function AboutUsHome() {
    const { aboutUsStore: { loadAboutUs, aboutUs} } = useStore();

    useEffect(() => {
        loadAboutUs()
    }, [loadAboutUs]);

    return (
        <Segment basic clearing style={{ padding: '8em 0em' }} vertical>
            <Grid container stackable verticalAlign='middle'>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                            {aboutUs.header}
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            {aboutUs.body}
                        </p>
                    </Grid.Column>
                    <Grid.Column floated='right' width={6}>
                        <Image bordered rounded size='large' src={aboutUs.image || './assets/placeholder.png'} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
})