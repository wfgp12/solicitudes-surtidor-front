import { ColumnsType } from "antd/es/table";
import http from "../http.service";
import { EditColumVisibility, TableConfig, TableRequestIndex } from "../../models/tables";

export const getTableColumnsService = async (tableName: string) => {
    try {
        const { status, data, error } = await http.get<ColumnsType>(`api/table-config/${tableName}`);
        if (status === 'error' || !data) throw new Error(error?.message as string);

        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const getTableConfigService = async (tableName: string) => {
    try {
        const { status, data, error } = await http.get<TableConfig<TableRequestIndex>>(`api/table-config/visibility/${tableName}`);
        if (status === 'error' || !data) throw new Error(error?.message as string);

        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const updateTableConfigService = async (tableName: string, columns: EditColumVisibility[]) => {
    try {
        const { status, data, error } = await http.put<TableConfig<TableRequestIndex>>(`api/table-config`, tableName, { columns: columns });
        if (status === 'error' || !data) throw new Error(error?.message as string);

        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}