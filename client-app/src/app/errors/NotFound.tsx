import { Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
    return (
        <Segment.Group>
            <Segment style={{padding:'13em 0 8em 0'}} placeholder>
                <Header icon>
                    <Icon name="search" />
                    Oops - we've looked everywhere but could not find what you are looking for!
                </Header>
                <Segment.Inline>
                </Segment.Inline>
            </Segment>
        </Segment.Group>
    )
}