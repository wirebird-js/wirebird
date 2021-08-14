import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';
import { Filters, initialFilters } from '../../utils/Filters';

export interface FiltersState {
    filters: Filters;
}

const initialState: FiltersState = {
    filters: initialFilters,
};

export const slice = createSlice({
    name    : 'filters',
    initialState,
    reducers: {
        resetFilters: (state) => ({
            ...state,
            filters: initialFilters,
        }),
        setFilters: (state, { payload }: PayloadAction<Filters>) => ({
            ...state,
            filters: payload,
        }),
        restoreFilters: (state, { payload }: PayloadAction<Filters>) => ({
            ...state,
            filters: payload,
        }),
    },
});

export const getFilters = (state: FiltersState): Filters => {
    return state.filters;
};

export const isAnyFilterSelected = (state: FiltersState): boolean => {
    return !isEqual(state.filters, initialFilters);
};
