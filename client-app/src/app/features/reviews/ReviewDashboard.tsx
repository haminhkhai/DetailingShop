import CoverSlogan from "../cover slogans/CoverSlogan";
import ReviewsShowCase from "./ReviewsShowCase";

export default function ReviewDashboard() {
    return (
        <>
            <CoverSlogan slogan={'REVIEWS'}
                image={'./assets/sliderImages/Detail1.jpg'} />
            <ReviewsShowCase />
        </>


    )
}