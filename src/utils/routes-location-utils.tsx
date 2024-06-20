// Assets - icons
import FileTextIcon from './../assets/icons/icon-file-text.svg'
import FolderIcon from './../assets/icons/icon-folder.svg'
import ChartIcon from './../assets/icons/icon-chart.svg'
import UserGroupIcon from './../assets/icons/icon-users-group.svg'
// Models
import { IRoute } from '../models/routes';
import {
    AdministratorPage,
    HomePage,
    NotFoundPage
} from "../pages";
import { MainRole } from '../models/user';

export const routes: IRoute[] = [
    {
        path: "request",
        element: <HomePage />,
        label: "Solicitudes",
        icon: FileTextIcon,
        permissions: ["administrador", "solicitantes", "monitor"]
    },
    {
        path: "request-management",
        element: <NotFoundPage />,
        label: "Gestión de solicitudes",
        icon: FolderIcon,
        permissions: ["monitor", "gestionador", "administrador"]
    },
    {
        path: "reports",
        element: <NotFoundPage />,
        label: "Reportes",
        icon: ChartIcon,
        permissions: ["administrador", "monitor"]
    },
    {
        path: "administrator",
        element: <AdministratorPage />,
        label: "Administrador",
        icon: UserGroupIcon,
        permissions: ["administrador"]
    },
];

export const getDefaultRoute = (role?: MainRole) => {
    switch (role) {
        case 'gestionador':
            return '/request-management';
        case 'monitor':
            return '/reports';
        case 'administrador':
            return '/administrator';
        case 'solicitantes':
        default:
            return '/request';
    }
};