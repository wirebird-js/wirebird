import { applyMiddleware, createStore, compose, combineReducers } from 'redux';

import rootSaga from './sagas';
import rootReducer from './reducers';
import { AppState } from './types';

import middleware, { sagaMiddleware } from './middleware';

const reducer = combineReducers({ ...rootReducer });

const composeEnhancer =
    (process.browser && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const configStore = (initialState: AppState = {}) => {
    const store = createStore(
        reducer,
        initialState,
        composeEnhancer(applyMiddleware(...middleware))
    );

    process.browser && sagaMiddleware.run(rootSaga);

    return store;
};

const store = configStore();

export default store;
