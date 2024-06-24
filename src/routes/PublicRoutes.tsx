import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/store/hooks";
import { PublicLayout } from "../components";
import { getDefaultRoute } from "../utils/routes-location-utils";

export const PublicRoutes = () => {
    const {isAuth, user} = useAppSelector(state => state.auth)
    const location = useLocation();

    return (isAuth)
        ? <Navigate to={getDefaultRoute(user!.role.permissions)} state={{ from: location }} replace />
        : <PublicLayout>
            <Outlet />
        </PublicLayout>
}