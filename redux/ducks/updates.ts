import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MonitorEvent } from 'http-inspector';
import { IndexedList, IIndexedListStore } from '../../utils/IndexedList';

export const indexedList = new IndexedList<MonitorEvent>(
    (event): string => event.request.id
);

export interface UpdatesState {
    eventsList: IIndexedListStore<MonitorEvent>;
    currentEventID: string | null;
}

const initialState: UpdatesState = {
    eventsList: indexedList.init(),
    currentEventID: null,
};

const slice = createSlice({
    name: 'updates',
    initialState,
    reducers: {
        addLoggerEvent: (state, { payload }: PayloadAction<MonitorEvent>) => ({
            ...state,
            eventsList: indexedList.push(state.eventsList, payload),
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

export const getLoggerEvents = (state: UpdatesState) => state.eventsList;

export const getCurrentLoggerEvent = (state: UpdatesState) =>
    state.currentEventID
        ? indexedList.get(state.eventsList, state.currentEventID)
        : null;
