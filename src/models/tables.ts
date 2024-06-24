import { RoleType, UserDAO } from "./user";

export const mapperUserToUserIndexTable = (userDAO: UserDAO) => ({
    id: userDAO.id,
    name: userDAO.name,
    document: userDAO.document,
    email: userDAO.email,
    role: userDAO.role.name
})


export interface UserIndexTable extends Omit<UserDAO, 'role'>{
    role: RoleType
}
