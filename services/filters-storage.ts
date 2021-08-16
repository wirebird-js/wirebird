import { Filters, initialFilters } from '../utils/Filters';

const FILTERS_STORAGE_PREFIX = 'wirebird.filters.v1';

function sanitizeFilters(input: any) {
    if (typeof input !== 'object' && !input) {
        return initialFilters;
    }
    const result = { ...initialFilters };
    const inputAsFilters: Filters = input;
    if (typeof inputAsFilters.domain === 'string') {
        result.domain = inputAsFilters.domain;
    }
    if (typeof inputAsFilters.method === 'string') {
        result.method = inputAsFilters.method;
    }
    if (typeof inputAsFilters.search === 'string') {
        result.search = inputAsFilters.search;
    }
    if (typeof inputAsFilters.pid === 'number') {
        result.pid = inputAsFilters.pid;
    }
    return result;
}

export interface FiltersStorage {
    save(filters: Filters): void;
    load(): Filters;
}

export class FiltersStorageImpl implements FiltersStorage {
    save(filters: Filters): void {
        localStorage.setItem(FILTERS_STORAGE_PREFIX, JSON.stringify(filters));
    }
    load(): Filters {
        const serializedFilters = localStorage.getItem(FILTERS_STORAGE_PREFIX);
        if (!serializedFilters) {
            return initialFilters;
        }
        let parsedFilters: Filters = initialFilters;
        try {
            parsedFilters = JSON.parse(serializedFilters);
        } catch (e) {
            return initialFilters;
        }
        return sanitizeFilters(parsedFilters);
    }
}
