import { LoggerEvent } from 'http-inspector';
import { createSelector } from 'reselect';
import { IndexedList } from '../../utils/IndexedList';
import { createAction, createReducer } from '@reduxjs/toolkit';

export interface UpdatesState {
    eventsList: IndexedList<LoggerEvent>;
    currentEventID: string | null;
}

export const loggerEventReceivedAction = createAction<LoggerEvent>(
    'updates/loggerEventReceived'
);
export const setCurrentEventIDAction = createAction<string | null>(
    'updates/setCurrentEventID'
);

export const reducer = createReducer<UpdatesState>(
    {
        eventsList: new IndexedList<LoggerEvent>(
            (event: LoggerEvent): string => event.request.id
        ),
        currentEventID: null,
    },
    (builder) => {
        builder
            .addCase(loggerEventReceivedAction, (state, { payload }) => ({
                ...state,
                eventsList: state.eventsList.push(payload),
            }))
            .addCase(setCurrentEventIDAction, (state, { payload }) => ({
                ...state,
                currentEventID: payload,
            }));
    }
);

const getCurrentSliceState = (state: { updates: UpdatesState }): UpdatesState =>
    state.updates;

export const getLoggerEvents = createSelector(
    getCurrentSliceState,
    (state) => state.eventsList
);

export const getCurrentLoggerEvent = createSelector(
    getCurrentSliceState,
    (state) =>
        state.currentEventID
            ? state.eventsList.get(state.currentEventID) || null
            : null
);
