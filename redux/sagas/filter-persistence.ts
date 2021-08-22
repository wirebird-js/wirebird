import { call, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { SagaReturnType } from 'redux-saga/effects';
import { FiltersStorage } from '../../services/filters-storage';
import { Filters } from '../../utils/Filters';
import { slice as filtersSlice } from '../ducks/filters';

export default (storage: FiltersStorage) =>
    function* filterPersistence(): SagaIterator {
        const restoredFilters: SagaReturnType<
            FiltersStorage['load']
        > = yield call([storage, storage.load]);

        yield put(filtersSlice.actions.restoreFilters(restoredFilters));

        yield takeLatest(
            [
                filtersSlice.actions.setFilters,
                filtersSlice.actions.resetFilters,
            ],
            function* (action: PayloadAction<Filters>) {
                yield call([storage, storage.save], action.payload);
            }
        );
    };
