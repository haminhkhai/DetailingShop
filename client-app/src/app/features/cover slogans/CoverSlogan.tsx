import { Image, Segment } from "semantic-ui-react";

interface Props {
    slogan: string;
    image: string;
}

export default function CoverSlogan({ slogan, image }: Props) {
    return (
        <>
            <div className='cover-slogan-container'>
                <h2 className='slogan'>{slogan}</h2>
            </div>
            <Segment basic style={{ padding: '0', margin: '0', border: '0' }} className="cover-container">
                <Image className="cover-image" src={image} />
            </Segment>
        </>
    )
}