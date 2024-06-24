import { Navigate, Route, Routes } from "react-router-dom";
// Components
import { ProtectedDashboardRoutes, ProtectedRoutes, PublicRoutes } from ".";
// Pages
import {
    LoginPage,
    NotFoundPage
} from "../pages";

// Redux - hooks
import { useAppSelector } from "../redux/store/hooks";
// Models
import { getDefaultRoute, routes } from "../utils/routes-location-utils";


export const AppRouter = () => {
    const user = useAppSelector(state => state.auth.user);

    const renderProtectedRoutes = () => {
        return routes
            .filter(route => {
                if (route.permissions.length === 0) return true;
                const userPermissions = user?.role.permissions.map(permission => permission.name) || [];
                return route.permissions.some(permission => userPermissions.includes(permission));
            })
            .map((route) => {
                return <Route key={route.label} path={route.path} element={route.element} />;
            });
    }

    return (
        <Routes>
            <Route path="" element={<PublicRoutes />}>
                <Route path="" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route path="" element={<ProtectedRoutes />}>
                <Route path="" element={<ProtectedDashboardRoutes />}>
                    <Route path="" element={<Navigate to={getDefaultRoute(user?.role.permissions)} />} />
                    {renderProtectedRoutes()}
                </Route>
            </Route>
            <Route path="/not-found" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate replace to="/not-found" />} />
        </Routes>
    );
};
