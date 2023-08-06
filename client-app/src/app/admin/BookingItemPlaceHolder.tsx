import React, { Fragment } from "react";
import { Button, Placeholder, Segment } from "semantic-ui-react";

export default function BookingItemPlaceHolder() {
    return (
        <Fragment>
            <Placeholder fluid style={{ marginTop: 25 }}>
                <Segment.Group>
                    <Segment style={{ minHeight: 110 }}>
                        <Placeholder>
                            <Placeholder.Header>
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder.Header>
                            <Placeholder.Paragraph>
                                <Placeholder.Line />
                            </Placeholder.Paragraph>
                        </Placeholder>
                    </Segment>
                    <Segment>
                        <Placeholder>
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder>
                    </Segment>
                    <Segment secondary style={{ minHeight: 70 }} />
                    <Segment clearing>
                        {/* <Button basic color='blue' floated='right' content='View' /> */}
                    </Segment>
                </Segment.Group>
            </Placeholder>
        </Fragment>
    )
}