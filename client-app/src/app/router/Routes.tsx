import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import BookingDashboard from "../features/bookings/BookingDashboard";
import GalleryDashboard from "../features/galleries/GalleryDashboard";
import ReviewDashboard from "../features/reviews/ReviewDashboard";
import LoginForm from "../admin/LoginForm";
import AboutUsAdmin from "../admin/about/AboutUs";
import ReviewAdmin from "../admin/reviews/Review";
import ServiceAdmin from "../admin/services/Service";
import ServiceFormAdmin from "../admin/services/ServiceForm";
import AddOnFormAdmin from "../admin/addons/AddOnForm";
import AddOnAdmin from "../admin/addons/AddOn";
import BookingAdmin from "../admin/bookings/Booking";
import GalleryAdmin from "../admin/galleries/Gallery";
import GalleryFormAdmin from "../admin/galleries/GalleryForm";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import CarouselAdmin from "../admin/carousels/Carousel";
import CarouselFormAdmin from "../admin/carousels/CarouselForm";
import RequireAuth from "./RequireAuth";
import BlogAdmin from "../admin/blogs/Blog";
import CategoryForm from "../admin/blogs/CategoryForm";
import BlogForm from "../admin/blogs/BlogForm";
import BlogDashboard from "../features/blogs/BlogDashboard";
import BlogDetail from "../features/blogs/BlogDetail";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                element: <RequireAuth />, children: [
                    { path: 'admin/carousel', element: <CarouselAdmin /> },
                    { path: 'admin/createCarousel', element: <CarouselFormAdmin key="createCarousel" /> },
                    { path: 'admin/manageCarousel/:id', element: <CarouselFormAdmin key="manageCarousel" /> },
                    { path: 'admin/aboutus', element: <AboutUsAdmin /> },
                    { path: 'admin/review', element: <ReviewAdmin /> },
                    { path: 'admin/service', element: <ServiceAdmin /> },
                    { path: 'admin/createService', element: <ServiceFormAdmin key='create' /> },
                    { path: 'admin/manageService/:id', element: <ServiceFormAdmin key='manage' /> },
                    { path: 'admin/addOn', element: <AddOnAdmin /> },
                    { path: 'admin/createAddOn', element: <AddOnFormAdmin key='createAddOn' /> },
                    { path: 'admin/manageAddOn/:id', element: <AddOnFormAdmin key='manageAddOn' /> },
                    { path: 'admin/booking', element: <BookingAdmin /> },
                    { path: 'admin/gallery', element: <GalleryAdmin /> },
                    { path: 'admin/createGallery', element: <GalleryFormAdmin key='createGallery' /> },
                    { path: 'admin/manageGallery/:id', element: <GalleryFormAdmin key='manageGallery' /> },
                    { path: 'admin/blog/', element: <BlogAdmin /> },
                    { path: 'admin/createCategory/', element: <CategoryForm key='createCategory' /> },
                    { path: 'admin/manageCategory/:id', element: <CategoryForm key='manageCategory' /> },
                    { path: 'admin/createBlog/', element: <BlogForm key='createBlog' /> },
                    { path: 'admin/manageBlog/:id', element: <BlogForm key='manageBlog' /> },
                ]
            },
            { path: 'booking', element: <BookingDashboard /> },
            { path: 'gallery', element: <GalleryDashboard /> },
            { path: 'blog', element: <BlogDashboard key='newest' /> },
            { path: 'blog/:category', element: <BlogDashboard key='category'/> },
            { path: 'blog/:category/:id', element: <BlogDetail /> },
            { path: 'review', element: <ReviewDashboard /> },
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