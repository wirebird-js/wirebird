export interface Filters {
    pid?: number;
    domain?: string;
    search?: string;
}

export const initialFilters: Filters = {
    pid: undefined,
    domain: undefined,
    search: undefined,
};
