import { all } from 'redux-saga/effects';
import updates from './updates';

export default function* root() {
    yield all([updates()]);
}
