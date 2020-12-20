import { SagaIterator } from 'redux-saga';
import { all, AllEffect } from 'redux-saga/effects';
import updates from './updates';

export default function* root(): Generator<AllEffect<SagaIterator>> {
    yield all([updates()]);
}
