import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MonitorEvent } from 'http-inspector';
import { IndexedList, IIndexedListStore } from '../../utils/IndexedList';
import { current } from 'immer';

export const indexedList = new IndexedList<MonitorEvent>(
    (event): string => event.request.id,
    {
        pid: 'processData.pid',
    }
);

export interface UpdatesState {
    eventsList: IIndexedListStore<MonitorEvent>;
    currentEventID: string | null;
}

const initialState: UpdatesState = {
    eventsList: indexedList.init(),
    currentEventID: null,
};

export const slice = createSlice({
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

export const getLoggerEvents = (state: UpdatesState) =>
    indexedList.getAll(state.eventsList);

export const getCurrentLoggerEvent = (state: UpdatesState) =>
    state.currentEventID
        ? indexedList.getByKey(state.eventsList, state.currentEventID)
        : null;

export const getAllPIDs = (state: UpdatesState) =>
    indexedList.getUniqueValues(state.eventsList, 'pid');
