import UpdatesService from '../../services/updates';
import { SagaIterator, eventChannel, END } from 'redux-saga';
import { call, take, put } from 'redux-saga/effects';
import { LoggerEvent } from 'http-inspector';
import { loggerEventReceivedAction } from '../ducks/updates';

function createUpdatesChannel(updatesService: UpdatesService) {
    return eventChannel<LoggerEvent>(emitter => {
        updatesService.on('LOGGER_EVENT', (e: LoggerEvent) => {
            emitter(e);
        });
        return () => {};
    });
}

export default function* updates(): SagaIterator {
    const updatesService = new UpdatesService();
    updatesService.start();
    const chan = yield call(createUpdatesChannel, updatesService);
    while (true) {
        const loggerEvent = yield take(chan);
        yield put(loggerEventReceivedAction(loggerEvent));
    }
}
