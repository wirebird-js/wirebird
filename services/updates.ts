import { SerializedLoggerEvent, MonitorEvent, validate } from 'wirebird-client';
import { EventEmitter } from 'events';

export interface UpdatesServiceEvents {
    on(
        eventName: 'LOGGER_EVENT',
        eventHandler: (event: MonitorEvent) => void
    ): void;
    on(eventName: 'ONLINE', eventHandler: () => void): void;
    emit(eventName: 'LOGGER_EVENT', event: MonitorEvent): void;
    emit(eventName: 'ONLINE'): void;
}

interface IncomingSocketMessage {
    type: 'LOGGER_EVENT' | 'ONLINE';
    payload: any;
}

export default class UpdatesService
    extends EventEmitter
    implements UpdatesServiceEvents {
    private sock: WebSocket;

    private unserializeBase64(input: string | null): Buffer | null {
        if (!input) {
            return null;
        }
        return Buffer.from(input, 'base64');
    }
    private validateLoggerEvent(event: SerializedLoggerEvent): boolean {
        return validate(event).valid;
    }
    private unserialiseLoggerEvent(event: SerializedLoggerEvent): MonitorEvent {
        if (event.response) {
            return {
                request: {
                    ...event.request,
                    body: this.unserializeBase64(event.request.body),
                },
                response: {
                    ...event.response,
                    body: this.unserializeBase64(event.response.body),
                },
                error      : null,
                processData: event.processData,
            };
        }

        if (event.error) {
            return {
                request: {
                    ...event.request,
                    body: this.unserializeBase64(event.request.body),
                },
                response   : null,
                error      : event.error,
                processData: event.processData,
            };
        }
        throw new Error('Error unserializing MonitorEvent');
    }

    constructor() {
        super();
        const { location } = document;
        this.sock = new WebSocket(`ws://${location.host}/api/updates`);
    }

    start(): void {
        this.sock.addEventListener('message', (messageEvent) => {
            try {
                const messageData = JSON.parse(
                    messageEvent.data
                ) as IncomingSocketMessage;
                if (messageData.type === 'ONLINE') {
                    this.emit('ONLINE');
                }
                if (messageData.type === 'LOGGER_EVENT') {
                    if (!this.validateLoggerEvent(messageData.payload)) {
                        console.error('Invalid data');
                    }
                    this.emit(
                        'LOGGER_EVENT',
                        this.unserialiseLoggerEvent(messageData.payload)
                    );
                }
            } catch (e) {
                console.error('Error parsing socket event:', e);
            }
        });
    }
}
