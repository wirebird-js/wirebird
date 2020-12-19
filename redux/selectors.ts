import { combineSelectors } from 'comsel';
import {
    getCurrentLoggerEvent,
    getLoggerEvents,
    getAllPIDs,
    getLookups,
} from './ducks/updates';
import { getFilters } from './ducks/filters';
import { State } from './store';
import { createSelector } from 'reselect';
import { getFilteredLoggerEvents } from './selectors/getFilteredLoggerEvents';

const selectorsMap = {
    updates: {
        getLoggerEvents,
        getCurrentLoggerEvent,
        getAllPIDs,
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
