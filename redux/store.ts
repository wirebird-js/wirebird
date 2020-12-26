import {
    combineReducers,
    configureStore,
    getDefaultMiddleware,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import reducersMap from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers(reducersMap);

const store = configureStore({
    reducer   : rootReducer,
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck   : false,
            thunk            : false,
        }),
        sagaMiddleware,
    ],
});

process.browser && sagaMiddleware.run(rootSaga);

export default store;
export type State = ReturnType<typeof rootReducer>;
