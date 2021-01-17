import SocketServer from './SocketServer';

interface Context {
    socketServer: SocketServer;
}

export interface ContextedRequest {
    context: Context;
}
