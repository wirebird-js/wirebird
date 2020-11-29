import { createSelector } from 'reselect';
import { State } from './store';

const getUpdates = (state: State) => state.updates;

export const getLoggerEvents = createSelector(
    getUpdates,
    (state) => state.eventsList
);

export const getCurrentLoggerEvent = createSelector(
    getUpdates,
    (state) =>
        state.currentEventID
            ? state.eventsList.get(state.currentEventID) || null
            : null
);
