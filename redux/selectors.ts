import { createSelector } from 'reselect';
import { getCurrentLoggerEvent, getLoggerEvents } from './ducks/updates';
import { State } from './store';

const getUpdates = (state: State) => state.updates;

export const selectors = {
    updates: {
        getLoggerEvents: createSelector(
            getUpdates,
            getLoggerEvents
        ),
        getCurrentLoggerEvent: createSelector(
            getUpdates,
            getCurrentLoggerEvent
        ),
    },
};

selectors.updates;
