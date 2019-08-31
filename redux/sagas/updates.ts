import UpdatesService from '../../services/updates';
import { SagaIterator, eventChannel, END } from 'redux-saga';
import { call, take } from 'redux-saga/effects';
import { LoggerEvent } from 'http-inspector';

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
        console.log('[LoggerEvent]', loggerEvent);
    }
}
