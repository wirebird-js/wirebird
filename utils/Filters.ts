export interface Filters {
    pid?: number;
    domain?: string;
}

export const initialFilters: Filters = {
    pid: undefined,
    domain: undefined,
};
