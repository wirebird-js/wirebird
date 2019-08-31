import { Server } from 'http';
import WebSocket from 'ws';
import { LoggerEvent } from 'http-inspector';

export interface SocketServerOptions {
    server: Server;
}

export default class SocketServer {
    private wss: WebSocket.Server;

    private broadcast(data: any) {
        this.wss.clients.forEach(ws => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify(data));
            }
        });
    }

    private subscribe() {
        this.wss.on('connection', function connection(ws) {
            // ws.on('message', function incoming(message) {
            //     console.log('received: %s', message);
            // });
            console.log('connected');
            ws.send(JSON.stringify({ type: 'ONLINE' }));
        });
    }

    constructor({ server }: SocketServerOptions) {
        this.wss = new WebSocket.Server({ server, path: '/api/updates' });
        this.subscribe();
    }

    broadcastLoggerEvent(event: LoggerEvent) {
        this.broadcast({
            type: 'LOGGER_EVENT',
            payload: event
        });
    }
}
