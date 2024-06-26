import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/store/hooks";
import { ProtectedLayout } from "../components";

export const ProtectedRoutes = () => {
    const auth = useAppSelector(state => state.auth)
    const location = useLocation();

    return (!auth.isAuth)
        ? <Navigate to="/login" state={{ from: location }} replace />
        : <Outlet />
}

export const ProtectedDashboardRoutes = () => {
    return <ProtectedLayout>
        <Outlet />
    </ProtectedLayout>
}