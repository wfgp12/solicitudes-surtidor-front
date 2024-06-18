import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/store/hooks";
import { PublicLayout } from "../components";

export const PublicRoutes = () => {
    const auth = useAppSelector(state => state.auth)
    const location = useLocation();

    return (auth.isAuth)
        ? <Navigate to="/request" state={{ from: location }} replace />
        : <PublicLayout>
            <Outlet />
        </PublicLayout>
}