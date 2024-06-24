// Assets - icons
import FileTextIcon from './../assets/icons/icon-file-text.svg'
import FolderIcon from './../assets/icons/icon-folder.svg'
import ChartIcon from './../assets/icons/icon-chart.svg'
import UserGroupIcon from './../assets/icons/icon-users-group.svg'
// Models
import { IRoute } from '../models/routes';
import {
    AdministratorPage,
    // HomePage,
    NotFoundPage,
    RequestsPage
} from "../pages";
import { PermissionDAO, PermissionType } from '../models/user';

export const routes: IRoute[] = [
    {
        path: "request",
        element: <RequestsPage />,
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

const permissionRoutes: Record<PermissionType, string> = {
    'administrador': '/administrator',
    'monitor': '/reports',
    'gestionador': '/request-management',
    'solicitantes': '/request',
};

// Definir el orden de prioridad
const permissionPriority: PermissionType[] = ['administrador', 'monitor', 'gestionador', 'solicitantes'];

export const getDefaultRoute = (permissions?:PermissionDAO[]) => {
    if (permissions) {
        for (const permission of permissionPriority) {
            if (permissions.some(p => p.name === permission)) {
                return permissionRoutes[permission];
            }
        }
    }
    return '/request';
};