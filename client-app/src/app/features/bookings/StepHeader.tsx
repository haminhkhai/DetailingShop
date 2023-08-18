import { Container, Segment } from "semantic-ui-react";

interface Props {
    stepNo: number;
    title: string;
    subTitle: string;
}

export default function StepHeader({ stepNo, title, subTitle }: Props) {
    return (
        <Segment basic style={{ padding: '7em 0em',margin:'0' }} className="step-header-container">
            <Container>
                <span className="step-circle">
                    <span>{stepNo}</span>
                    <span>/4</span>
                </span>
                    <h4 className="step-title">{title}</h4>
                    <h5 className="step-sub-title">{subTitle}</h5>

            </Container>
        </Segment>
    )
}