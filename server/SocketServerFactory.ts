import SocketServer, { SocketServerOptions } from './SocketServer';

let instance: SocketServer | null = null;

export const init = (options: SocketServerOptions): void => {
    instance = new SocketServer(options);
};

export const get = (): SocketServer => {
    if (!instance) {
        throw new Error('Not initialized');
    }
    return instance;
};
