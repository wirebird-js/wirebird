import { MonitorEvent } from 'wirebird-client';
import { eventChannel, SagaIterator } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import UpdatesService from '../../services/updates';
import { slice as updatesSlice } from '../ducks/updates';

function createUpdatesChannel(updatesService: UpdatesService) {
    return eventChannel<MonitorEvent>((emitter) => {
        updatesService.on('LOGGER_EVENT', (e: MonitorEvent) => {
            emitter(e);
        });
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return () => {};
    });
}

export default function* updates(): SagaIterator {
    const updatesService = new UpdatesService();
    updatesService.start();
    const chan = yield call(createUpdatesChannel, updatesService);
    while (true) {
        const MonitorEvent = yield take(chan);
        if (MonitorEvent) {
            yield put(updatesSlice.actions.addLoggerEvent(MonitorEvent));
        }
    }
}
