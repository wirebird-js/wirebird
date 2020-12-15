import { combineSelectors } from 'comsel';
import {
    getCurrentLoggerEvent,
    getLoggerEvents,
    getAllPIDs,
} from './ducks/updates';
import { getFilters } from './ducks/filters';
import { State } from './store';

const selectorsMap = {
    updates: {
        getLoggerEvents,
        getCurrentLoggerEvent,
        getAllPIDs,
    },
    filters: {
        getFilters,
    },
};

export const selectors = combineSelectors<State, typeof selectorsMap>(
    selectorsMap
);
