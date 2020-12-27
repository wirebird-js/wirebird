export interface Filters {
    pid?: number;
    domain?: string;
    search?: string;
    method?: string;
}

export const initialFilters: Filters = {
    pid   : undefined,
    domain: undefined,
    search: undefined,
    method: undefined,
};
