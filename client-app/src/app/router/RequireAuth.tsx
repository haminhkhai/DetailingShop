import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import AdminRoute from "./AdminRoute";

export default observer(function RequireAuth() {
    const { userStore: { isLoggedIn } } = useStore();
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to='/login' state={{ from: location }} />
    }

    return <Outlet />
})