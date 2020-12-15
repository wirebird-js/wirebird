import { combineSelectors } from 'comsel';
import {
    getCurrentLoggerEvent,
    getLoggerEvents,
    getAllPIDs
} from './ducks/updates';
import { State } from './store';

const selectorsMap = {
    updates: {
        getLoggerEvents,
        getCurrentLoggerEvent,
        getAllPIDs
    }
};

export const selectors = combineSelectors<State, typeof selectorsMap>(
    selectorsMap
);
