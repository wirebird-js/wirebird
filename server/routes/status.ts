import { RouteHandlerMethod } from 'fastify';

export const statusHandler: RouteHandlerMethod = (_, res) => {
    res.send({ status: 'ok' });
};
