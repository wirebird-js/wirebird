import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
            thunk: false,
        }),
        sagaMiddleware,
    ],
});

process.browser && sagaMiddleware.run(rootSaga);

export default store;
