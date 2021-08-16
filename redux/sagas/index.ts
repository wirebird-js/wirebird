import { SagaIterator } from 'redux-saga';
import { all, AllEffect } from 'redux-saga/effects';
import { FiltersStorageImpl } from '../../services/filters-storage';
import filterPersistence from './filter-persistence';
import updates from './updates';

export default function* root(): Generator<AllEffect<SagaIterator>> {
    yield all([updates(), filterPersistence(new FiltersStorageImpl())()]);
}
