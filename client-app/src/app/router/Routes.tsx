import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import BookingDashboard from "../features/booking/BookingDashboard";
import GalleryDashboard from "../features/gallery/GalleryDashboard";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'booking', element: <BookingDashboard /> },
            { path: 'gallery', element: <GalleryDashboard /> },
            //describe key to reset state and rerender component because we using same component 
            //in same position so react will preserve state
            // { path: 'createActivity', element: <ActivityForm key='create' /> },
            // { path: 'manage/:id', element: <ActivityForm key='manage' /> }
        ]
    }
]

export const router = createBrowserRouter(routes)