import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MonitorEvent } from 'http-inspector';
import { IndexedList, IIndexedListStore } from '../../utils/IndexedList';
import { LookupManager, LookupStore } from '../../utils/LookupManager';

export const indexedList = new IndexedList<MonitorEvent>(
    (event): string => event.request.id
);

const lookupExtractor = (item: MonitorEvent) => {
    const pid = item.processData.pid;
    return {
        pid: {
            key: `${pid}`,
            value: pid,
        },
    };
};

export const lookupManager = new LookupManager(lookupExtractor);

export interface UpdatesState {
    lookups: LookupStore<ReturnType<typeof lookupExtractor>>;
    eventsList: IIndexedListStore<MonitorEvent>;
    currentEventID: string | null;
}

const initialState: UpdatesState = {
    lookups: lookupManager.init(),
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
            lookups: lookupManager.push(state.lookups, payload),
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
    lookupManager.getLookups(state.lookups, 'pid');

export const getLookups = (state: UpdatesState) => ({
    pid: lookupManager.getLookups(state.lookups, 'pid'),
});

export type Lookups = ReturnType<typeof getLookups>;
