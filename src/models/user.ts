export function mapperToUserDTO(userDAO: UserDAO):UserDTO {
    return {
        id: userDAO.id,
        name: userDAO.name,
        lastName: userDAO.lastName,
        email: userDAO.email,
        numberPhone: userDAO.phoneNumber,
        role: userDAO.role,
        subRole: userDAO.subRole
    }
}

export function mapperToUserDAO(userDTO: UserDTO):UserDAO {
    return {
        id: userDTO.id,
        name: userDTO.name,
        lastName: userDTO.lastName,
        email: userDTO.email,
        phoneNumber: userDTO.numberPhone,
        role: userDTO.role,
        subRole: userDTO.subRole
    }
}

export type MainRole = 'solicitantes' | 'monitor' | 'gestionador' | "administrador";

export type SubRole = 
    | 'asesora_comercial'
    | 'lider_de_seccion'
    | 'impulsadora'
    | 'supervisor'
    | 'administracion'
    | 'director_comercial'
    | 'asesor_complementario'
    | 'coordinador_de_bodega'
    | 'coordinador_de_compras';

export interface UserDTO {
    id:          number;
    name:        string;
    lastName:    string;
    email:       string;
    numberPhone: string;
    role:        MainRole;
    subRole:     SubRole;
}

export interface UserDAO {
    id:          number;
    name:        string;
    lastName:    string;
    email:       string;
    phoneNumber: string;
    role:        MainRole;
    subRole:     SubRole;
}
