import { combineSelectors } from 'comsel';
import { getCurrentLoggerEvent, getLoggerEvents } from './ducks/updates';
import { State } from './store';

const selectorsMap = {
    updates: {
        getLoggerEvents,
        getCurrentLoggerEvent
    }
};

export const selectors = combineSelectors<State, typeof selectorsMap>(
    selectorsMap
);
