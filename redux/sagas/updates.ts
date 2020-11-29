import { LoggerEvent } from 'http-inspector';
import { eventChannel, SagaIterator } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import UpdatesService from '../../services/updates';
import { addLoggerEvent } from '../ducks/updates';

function createUpdatesChannel(updatesService: UpdatesService) {
    return eventChannel<LoggerEvent>((emitter) => {
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
        if (loggerEvent) {
            yield put(addLoggerEvent(loggerEvent));
        }
    }
}
