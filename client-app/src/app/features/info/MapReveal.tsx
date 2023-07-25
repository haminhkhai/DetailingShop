import { useState } from 'react';
import { Container, Icon, Segment, TransitionGroup } from 'semantic-ui-react';

export default function MapReveal() {
    const [isMapReveal, setIsMapReveal] = useState(false);

    return (
        <>
            <TransitionGroup
                as={Container}
                duration={300}
                animation='slide up'
                fluid
            >
                {isMapReveal &&
                    <Container className='map-container' fluid>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2684.1257579335456!2d-122.29726702327267!3d47.72080828008351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549013dff26cc1cf%3A0xb15f6f1e413d5677!2sKenny&#39;s%20Auto%20Detail!5e0!3m2!1svi!2s!4v1687600008152!5m2!1svi!2s"
                            width="100%" height="400"
                            style={{ border: 0 }}
                            allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </Container>}
            </TransitionGroup>

            <Segment basic style={{padding: '0em', margin: '0'}} className='map-reveal-container'>
                <div onClick={() => { setIsMapReveal(!isMapReveal) }} className='toggle-map-button'>
                    <Icon name='map' color='grey' size='big' />
                    <p>{isMapReveal ? 'HIDE MAP' : 'SHOW MAP'}</p>
                </div>
            </Segment>
        </>
    )
}