// Generated by https://quicktype.io

export interface SiteDAO {
    id:        number;
    name:      string;
    sections:  SectionDAO[];
}

export type SiteCreate = Pick<SiteDAO, 'name'>

export interface SectionDAO {
    id:         number;
    identifier: string;
    name:       string;
}

export type SectionCreate = Omit<SectionDAO, 'id'>;