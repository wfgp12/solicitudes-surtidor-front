import { Navigate, Route, Routes } from "react-router-dom";
// Components
import { ProtectedDashboardRoutes, ProtectedRoutes, PublicRoutes } from ".";
// Pages
import {
    HomePage,
    LoginPage,
    NotFoundPage
} from "../pages";
// Assets - icons
import FileTextIcon from './../assets/icons/icon-file-text.svg'
import FolderIcon from './../assets/icons/icon-folder.svg'
import ChartIcon from './../assets/icons/icon-chart.svg'
import UserGroupIcon from './../assets/icons/icon-users-group.svg'


export const routes = [
    {
        path: "request",
        element: <HomePage />,
        label: "Solicitudes", 
        icon: FileTextIcon,
        permissions: []
    },
    {
        path: "request-management",
        element: <NotFoundPage />, 
        label: "Gestión de recursos",
        icon: FolderIcon,
        permissions: []
    },
    {
        path: "reports",
        element: <NotFoundPage />, 
        label: "Reportes",
        icon: ChartIcon,
        permissions:[]
    },
    {
        path: "administrator",
        element: <NotFoundPage />, 
        label: "Administrador",
        icon: UserGroupIcon,
        permissions:[]
    },
];

const protectedRoutes = [
    {
        path: "",
        element: <Navigate to="/request" />,
    },
    ...routes.map((route, index) => ({
        path: route.path,
        element: route.element,
        key: index,
    })),
];

export const AppRouter = () => {
    return (
        <Routes>
            {/* <Route path="" element={<Navigate to="/" />} /> */}
            <Route path="" element={<PublicRoutes />}>
                <Route path="" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route path="" element={<ProtectedRoutes />}>
                <Route path="" element={<ProtectedDashboardRoutes />}>
                    {protectedRoutes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element} />
                    ))}
                </Route>
            </Route>
            <Route path="/not-found" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate replace to="/not-found" />} />
        </Routes>
    );
};
