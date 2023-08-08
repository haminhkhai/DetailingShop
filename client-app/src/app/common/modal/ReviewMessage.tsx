import { Button, Container, Header, Segment } from "semantic-ui-react";

interface Props {
    close: () => void;
}

export default function ReviewMessage({ close }: Props) {
    return (
        <Segment clearing>
            <Container textAlign='center'>
            <Header>Thanks for reviewing!</Header>
          
            <Button floated='right' onClick={close} content="Close" />
            </Container>
        </Segment>
    )
}