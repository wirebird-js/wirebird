import { LoggerEvent } from 'http-inspector';
import { createAction, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

export interface UpdatesState {
    eventsById: {
        [id: string]: LoggerEvent;
    };
    eventsSequence: Array<string>;
}

const defaultState: UpdatesState = {
    eventsById: {},
    eventsSequence: [],
};

const LOGGER_EVENT_RECEIVED = 'loggerEventReceived';

export const loggerEventReceivedAction = createAction<LoggerEvent>(
    LOGGER_EVENT_RECEIVED
);

export const getBranch = (state: { updates: UpdatesState }): UpdatesState =>
    state.updates;

export const getLoggerEvents = createSelector(
    getBranch,
    (state) => state.eventsSequence.map((reqID) => state.eventsById[reqID])
);

export const reducer = handleActions<UpdatesState, LoggerEvent>(
    {
        [LOGGER_EVENT_RECEIVED]: (state, { payload }) => ({
            ...state,
            eventsById: {
                ...state.eventsById,
                [payload.request.id]: payload,
            },
            eventsSequence: [...state.eventsSequence, payload.request.id], //TODO: order should be based on the time
        }),
    },
    defaultState
);
