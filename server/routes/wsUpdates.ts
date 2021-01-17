import { WebsocketHandler } from 'fastify-websocket';

export const wsUpdatesHandler: WebsocketHandler = function (connection, req) {
    const unsub = this.updateEvents.sub((payload) => {
        connection.socket.send(
            JSON.stringify({ type: 'LOGGER_EVENT', payload })
        );
    });
    connection.socket.on('close', unsub);
};
