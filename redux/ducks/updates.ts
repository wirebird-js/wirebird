import { parse as parseURL } from 'url';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { MonitorEvent } from 'wirebird-client';
import { IndexedList, IIndexedListStore } from '../../utils/IndexedList';
import { LookupManager, LookupStore } from '../../utils/LookupManager';

export const indexedList = new IndexedList<MonitorEvent>(
    (event): string => event.request.id
);

const lookupExtractor = (item: MonitorEvent) => {
    const { pid } = item.processData;
    const method = item.request.method.toUpperCase();
    const u = parseURL(item.request.url);
    const domain = u.host;

    return {
        pid: {
            key  : `${pid}`,
            value: pid,
        },
        domain: {
            key  : `${domain}`,
            value: domain,
        },
        method: {
            key  : `${method}`,
            value: method,
        },
    };
};

export type Lookups = Required<LookupStore<ReturnType<typeof lookupExtractor>>>;

export const lookupManager = new LookupManager(lookupExtractor);

export interface UpdatesState {
    lookups: LookupStore<ReturnType<typeof lookupExtractor>>;
    eventsList: IIndexedListStore<MonitorEvent>;
    currentEventID: string | null;
}

const initialState: UpdatesState = {
    lookups       : lookupManager.init(),
    eventsList    : indexedList.init(),
    currentEventID: null,
};

export const slice = createSlice({
    name    : 'updates',
    initialState,
    reducers: {
        addLoggerEvent: (state, { payload }: PayloadAction<MonitorEvent>) => ({
            ...state,
            eventsList: indexedList.push(state.eventsList, payload),
            lookups   : lookupManager.push(state.lookups, payload),
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

export const getLoggerEvents = (state: UpdatesState): MonitorEvent[] =>
    indexedList.getAll(state.eventsList);

export const getCurrentLoggerEvent = (
    state: UpdatesState
): MonitorEvent | null =>
    state.currentEventID
        ? indexedList.getByKey(state.eventsList, state.currentEventID)
        : null;

export const getLookups = createSelector(
    (state: UpdatesState) => state.lookups,
    (lookups: UpdatesState['lookups']): Lookups => ({
        pid   : lookupManager.getLookups(lookups, 'pid'),
        domain: lookupManager.getLookups(lookups, 'domain'),
        method: lookupManager.getLookups(lookups, 'method'),
    })
);
