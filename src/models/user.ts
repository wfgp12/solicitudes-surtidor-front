export interface UserDAO {
    id: number;
    name: string;
    document: string;
    email: string;
    role: RoleDAO;
}
export interface UserCreate extends Omit<UserDAO, 'id' | 'role'> {
    id_role: number;
    password: string,
    confirmPassword: string
}

export type RoleType = 'asesora_comercial'
    | 'lider_de_seccion'
    | 'impulsadora'
    | 'supervisor'
    | 'administracion'
    | 'director_comercial'
    | 'asesor_complementario'
    | 'coordinador_de_bodega'
    | 'coordinador_de_compras';

export interface RoleDAO {
    id: number;
    name: RoleType;
    permissions: PermissionDAO[];
}

export interface RoleCreate {
    name: string,
    permissions: number[]
}

export type RoleSelector = Omit<RoleDAO, 'permissions'>

export type PermissionType = 'solicitante' | 'monitor' | 'gestionador' | 'administrador';

export interface PermissionDAO {
    id: number;
    name: PermissionType
}


