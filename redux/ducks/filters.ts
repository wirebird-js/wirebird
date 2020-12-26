import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
        setFilters: (state, { payload }: PayloadAction<Filters>) => ({
            ...state,
            filters: payload,
        }),
    },
});

export const getFilters = (state: FiltersState): Filters => {
    return state.filters;
};
