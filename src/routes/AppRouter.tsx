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
import { MainRole } from "../models/user";
import { getDefaultRoute, routes } from "../utils/routes-location-utils";


export const AppRouter = () => {
    const user = useAppSelector(state => state.auth.user);

    const renderProtectedRoutes = () => routes
        .filter(route => route.permissions.length === 0 || route.permissions.includes(user?.role as MainRole))
        .map((route, index) => {
            const isAuthorized = route.permissions.length === 0 || route.permissions.includes(user?.role as MainRole);
            if (isAuthorized) {
                return <Route key={index} path={route.path} element={route.element} />;
            }
            return null;
        });

    return (
        <Routes>
            {/* <Route path="" element={<Navigate to="/" />} /> */}
            <Route path="" element={<PublicRoutes />}>
                <Route path="" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route path="" element={<ProtectedRoutes />}>
                <Route path="" element={<ProtectedDashboardRoutes />}>
                    <Route path="" element={<Navigate to={getDefaultRoute(user?.role)} />} />
                    {renderProtectedRoutes()}
                </Route>
            </Route>
            <Route path="/not-found" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate replace to="/not-found" />} />
        </Routes>
    );
};
