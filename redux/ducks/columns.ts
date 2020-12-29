import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColumnsSelection } from '../../utils/Columns';

export interface ColumnsState {
    columnsSelection: ColumnsSelection;
}

const initialState: ColumnsState = {
    columnsSelection: {
        name          : true,
        requestMethod : true,
        responseStatus: true,
    },
};

export const slice = createSlice({
    name    : 'columns',
    initialState,
    reducers: {
        setColumnsSelection: (
            state,
            { payload }: PayloadAction<ColumnsSelection>
        ) => ({
            ...state,
            columnsSelection: payload,
        }),
    },
});

export const getColumnsSelection = (state: ColumnsState): ColumnsSelection => {
    return state.columnsSelection;
};
