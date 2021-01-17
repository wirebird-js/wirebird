import { EventEmitter } from 'ws';

export class PubSub<T> {
    private events = new EventEmitter();
    pub(data: T): void {
        this.events.emit('data', data);
    }
    sub(cb: (data: T) => void): () => void {
        this.events.on('data', cb);
        return () => {
            this.events.off('data', cb);
        };
    }
}
