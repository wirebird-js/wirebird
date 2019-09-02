import {
    createActions,
    handleActions,
    combineActions,
    createAction
} from 'redux-actions';
import { LoggerEvent } from 'http-inspector';

export interface State {
    eventsById: {
        [id: string]: LoggerEvent;
    };
    eventsSequence: Array<string>;
}

const defaultState: State = {
    eventsById: {},
    eventsSequence: []
};

const LOGGER_EVENT_RECEIVED = 'loggerEventReceived';

export const loggerEventReceivedAction = createAction<LoggerEvent>(
    LOGGER_EVENT_RECEIVED
);

export const reducer = handleActions<State, LoggerEvent>(
    {
        [LOGGER_EVENT_RECEIVED]: (state, { payload }) => ({
            ...state,
            eventsById: {
                ...state.eventsById,
                [payload.request.id]: payload
            },
            eventsSequence: [...state.eventsSequence, payload.request.id] //TODO: order should be based on the time
        })
    },
    defaultState
);
