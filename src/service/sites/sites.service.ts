
import { SectionDAO, SiteCreate, SiteDAO } from "../../models/sites";
import http from "../http.service";

export const createSiteService = async (newSite: SiteCreate) => {
    try {
        const { status, data, error } = await http.post<SiteDAO>('api/sites', {...newSite});
        if (status === 'error' || !data) throw new Error(error?.message as string);

        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const getListSitesService = async () => {
    try {
        const { status, data, error } = await http.get<SiteDAO[]>('api/sites');
        if (status === 'error' || !data) throw new Error(error?.message as string);

        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

//section service
export const createServiceService = async (newSection: SiteCreate, idSite: number) => {
    try {
        const { status, data, error } = await http.post<SectionDAO>('api/sections', {...newSection, id_site: idSite});
        if (status === 'error' || !data) throw new Error(error?.message as string);

        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
}
