import { combineSelectors } from 'comsel';
import { createSelector } from 'reselect';
import { getFilters } from './ducks/filters';
import {
    getCurrentLoggerEvent,
    getLoggerEvents,
    getLookups,
} from './ducks/updates';
import { getFilteredLoggerEvents } from './selectors/getFilteredLoggerEvents';
import { State } from './store';

const selectorsMap = {
    updates: {
        getLoggerEvents,
        getCurrentLoggerEvent,
        getLookups,
    },
    filters: {
        getFilters,
    },
};

export const sliceSelectors = combineSelectors<State, typeof selectorsMap>(
    selectorsMap
);

export const globalSelectors = {
    getFilteredLoggerEvents: createSelector(
        sliceSelectors.filters.getFilters,
        sliceSelectors.updates.getLoggerEvents,
        getFilteredLoggerEvents
    ),
};
