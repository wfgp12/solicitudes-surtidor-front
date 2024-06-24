import { RoleType, UserDAO } from "./user";

export const mapperUserToUserIndexTable = (userDAO: UserDAO) => ({
    id: userDAO.id,
    name: userDAO.name,
    document: userDAO.document,
    email: userDAO.email,
    role: userDAO.role.name
})


export interface UserIndexTable extends Omit<UserDAO, 'role'> {
    role: RoleType
}

export interface RequestIndexTable {

}


export type TableConfig<T extends string> = {
    [field in T]: {
        isVisible: boolean,
        order: number
    };
};

export type TableRequestIndex = 'Archivo adjunto' | 'Descripcion' | 'Estado' | 'Fecha de respuesta' | 'Fecha de solicitud' | 'Referencia' | 'Revisado por' | 'Tipo de solicitud';

export interface EditColumVisibility {
    name: string,
    isVisible: boolean
}