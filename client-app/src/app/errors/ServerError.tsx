import { Container, Header, Segment } from 'semantic-ui-react'
import { useStore } from '../stores/store'
import { observer } from 'mobx-react-lite';

export default observer(function ServerError() {
    const { commonStore } = useStore();
    return (
        <Segment.Group>
            <Segment style={{padding:'13em 0 8em 0'}}>
                <Container>
                    <Header as='h1' content='Server Error' />
                    <Header sub as='h5' color="red" content={commonStore.error?.message} />
                    {commonStore.error?.details && (
                        <Segment>
                            <Header as='h4' content='Stack trace' color="teal" />
                            <code style={{ marginTop: '10px' }}>{commonStore.error.details}</code>
                        </Segment>
                    )}
                </Container>
            </Segment>
        </Segment.Group>
    )
})