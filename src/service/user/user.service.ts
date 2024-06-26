import { PermissionDAO, RoleCreate, RoleDAO, RoleSelector, UserCreate, UserDAO } from "../../models/user";
import http from "../http.service";


// User services
export const getListUserService = async () => {
    try {
        const { status, data, error } = await http.get<UserDAO[]>('api/users');
        if (status === 'error' || !data) throw new Error(error?.message as string);

        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const getUserService = async (userId: number) => {
    try {
        const { status, data, error } = await http.get<UserDAO>(`api/users/${userId}`);
        if (status === 'error' || !data) throw new Error(error?.message as string);

        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const createUserService = async (newUser: UserCreate) => {
    try {
        const { status, data, error } = await http.post<UserDAO>('api/users', { ...newUser });
        if (status === 'error' || !data) throw new Error(error?.message as string);

        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const updateUserService = async (userId: number, updateUser: UserCreate) => {
    try {
        const { status, data, error } = await http.put<UserDAO>('api/users', userId, { ...updateUser });
        if (status === 'error' || !data) throw new Error(error?.message as string);

        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const deleteUserService = async (userId: number) => {
    try {
        const { status, data, error } = await http.delete('api/users', userId);
        if (status === 'error' || !data) throw new Error(error?.message as string);

        return true;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

// Role Services
export const getListRoleService = async () => {
    try {
        const { status, data, error } = await http.get<RoleDAO[]>('api/roles');
        if (status === 'error' || !data) throw new Error(error?.message as string);

        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const getRoleSelectorService = async () => {
    try {
        const { status, data, error } = await http.get<RoleSelector[]>('api/roles/selector');
        if (status === 'error' || !data) throw new Error(error?.message as string);

        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const createRoleService = async (newRole: RoleCreate) => {
    try {
        const { status, data, error } = await http.post<PermissionDAO>('api/roles', { ...newRole });
        if (status === 'error' || !data) throw new Error(error?.message as string);

        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const deleteRoleService = async (roleId: number) => {
    try {
        const { status, data, error } = await http.delete('api/roles', roleId);
        if (status === 'error' || !data) throw new Error(error?.message as string);

        return true;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

// Permission services

export const getListPermissionService = async () => {
    try {
        const { status, data, error } = await http.get<PermissionDAO[]>('api/permissions');
        if (status === 'error' || !data) throw new Error(error?.message as string);

        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}
