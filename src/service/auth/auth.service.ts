import { LoginResponse, RegisterForm, RegisterResponse } from "../../models/auth"
import { UserDAO } from "../../models/user";
import { LocalStorageKeys } from "../../utils/local-storage-keys";
import http from "../http.service";

export const loginService = async (document: string, password: string) => {
    try {
        const { status, data, error } = await http.post<LoginResponse>('api/users/login', { document, password });
        if (status === 'error' || !data) throw new Error(error?.message as string);

        const {user, token} = data;
        localStorage.setItem(LocalStorageKeys.token, token);

        return {
            user,
            token
        }
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const registerService = async (newUser: RegisterForm) => {
    try {
        const { status, data, error } = await http.post<RegisterResponse>('api/user', {...newUser});
        console.log(status, data, error);
        if (status === 'error' || !data) throw new Error(error?.message as string);

        return true;
    } catch (error) {
        console.error(error);
    }
}

export const validateTokenSession = async () => {
    try {
        const { status, data, error } = await http.post<UserDAO>('api/users/validate-session');
        if (status === 'error' || !data) throw new Error(error?.message as string);

        return data;
        
    } catch (error) {
        throw new Error((error as Error).message)
    }
}