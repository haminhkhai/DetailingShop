import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import BookingDashboard from "../features/booking/BookingDashboard";
import GalleryDashboard from "../features/gallery/GalleryDashboard";
import ReviewDashboard from "../features/review/ReviewDashboard";
import LoginForm from "../admin/LoginForm";
import AboutUsAdmin from "../admin/AboutUsAdmin";
import ReviewAdmin from "../admin/ReviewAdmin";
import ServiceAdmin from "../admin/ServiceAdmin";
import ServiceFormAdmin from "../admin/ServiceFormAdmin";
import AddOnFormAdmin from "../admin/AddOnFormAdmin";
import AddOnAdmin from "../admin/AddOnAdmin";
import BookingAdmin from "../admin/BookingAdmin";
import GalleryAdmin from "../admin/GalleryAdmin";
import GalleryFormAdmin from "../admin/GalleryFormAdmin";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import CarouselAdmin from "../admin/CarouselAdmin";
import CarouselFormAdmin from "../admin/CarouselFormAdmin";
import RequireAuth from "./RequireAuth";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                element: <RequireAuth />, children: [
                    { path: 'admin/carousels', element: <CarouselAdmin /> },
                    { path: 'admin/createCarousel', element: <CarouselFormAdmin key="createCarousel" /> },
                    { path: 'admin/manageCarousel/:id', element: <CarouselFormAdmin key="manageCarousel" /> },
                    { path: 'admin/aboutus', element: <AboutUsAdmin /> },
                    { path: 'admin/reviews', element: <ReviewAdmin /> },
                    { path: 'admin/services', element: <ServiceAdmin /> },
                    { path: 'admin/createService', element: <ServiceFormAdmin key='create' /> },
                    { path: 'admin/manageService/:id', element: <ServiceFormAdmin key='manage' /> },
                    { path: 'admin/addOns', element: <AddOnAdmin /> },
                    { path: 'admin/createAddOn', element: <AddOnFormAdmin key='createAddOn' /> },
                    { path: 'admin/manageAddOn/:id', element: <AddOnFormAdmin key='manageAddOn' /> },
                    { path: 'admin/bookings', element: <BookingAdmin /> },
                    { path: 'admin/galleries', element: <GalleryAdmin /> },
                    { path: 'admin/createGallery', element: <GalleryFormAdmin key='createGallery' /> },
                    { path: 'admin/manageGallery/:id', element: <GalleryFormAdmin key='manageGallery' /> },
                ]
            },
            { path: 'booking', element: <BookingDashboard /> },
            { path: 'gallery', element: <GalleryDashboard /> },
            { path: 'reviews', element: <ReviewDashboard /> },
            { path: 'login', element: <LoginForm /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'server-error', element: <ServerError /> },
            { path: '*', element: <Navigate replace to='/not-found' /> },
            //describe key to reset state and rerender component because we using same component 
            //in same position so react will preserve state
            // { path: 'createActivity', element: <ActivityForm key='create' /> },
            // { path: 'manage/:id', element: <ActivityForm key='manage' /> }
        ]
    }
]

export const router = createBrowserRouter(routes)