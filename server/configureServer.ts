import fastifyStatic from 'fastify-static';
import fastifyWebsocket from 'fastify-websocket';
import { MonitorEvent } from 'http-inspector';
import { join, resolve } from 'path';
import { PubSub } from './PubSub';
import { statusHandler } from './routes/status';
import { updatesHandler } from './routes/updates';
import { wsUpdatesHandler } from './routes/wsUpdates';
import { FastifyInstance } from 'fastify';
import { schema } from 'http-inspector';

export const configureServer = (fastify: FastifyInstance): void => {
    fastify.decorate('updateEvents', new PubSub<MonitorEvent>());

    fastify.register(fastifyStatic, {
        root : resolve(join(__dirname, '..', 'client-dist')),
        index: ['main.html'],
    });

    fastify.register(fastifyWebsocket);

    fastify.get('/status', statusHandler);
    fastify.post('/api/updates', { schema: { body: schema } }, updatesHandler);
    fastify.get('/api/updates', { websocket: true }, wsUpdatesHandler);
};
