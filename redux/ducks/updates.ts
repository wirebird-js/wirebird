import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoggerEvent } from 'http-inspector';
import { IndexedList } from '../../utils/IndexedList';

export interface UpdatesState {
    eventsList: IndexedList<LoggerEvent>;
    currentEventID: string | null;
}

const initialState: UpdatesState = {
    eventsList: new IndexedList<LoggerEvent>(
        (event: LoggerEvent): string => event.request.id
    ),
    currentEventID: null,
};

const slice = createSlice({
    name: 'updates',
    initialState,
    reducers: {
        addLoggerEvent: (state, { payload }: PayloadAction<LoggerEvent>) => ({
            ...state,
            eventsList: state.eventsList.push(payload),
        }),
        setCurrentEventID: (
            state,
            { payload }: PayloadAction<string | null>
        ) => ({
            ...state,
            currentEventID: payload,
        }),
    },
});

export const { reducer } = slice;
export const { addLoggerEvent, setCurrentEventID } = slice.actions;
