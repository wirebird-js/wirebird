import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MonitorEvent } from 'http-inspector';
import { IndexedList } from '../../utils/IndexedList';

export interface UpdatesState {
    eventsList: IndexedList<MonitorEvent>;
    currentEventID: string | null;
}

const initialState: UpdatesState = {
    eventsList: new IndexedList<MonitorEvent>(
        (event: MonitorEvent): string => event.request.id
    ),
    currentEventID: null,
};

const slice = createSlice({
    name: 'updates',
    initialState,
    reducers: {
        addLoggerEvent: (state, { payload }: PayloadAction<MonitorEvent>) => ({
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
