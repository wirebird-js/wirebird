import { RouteHandlerMethod } from 'fastify';
import { MonitorEvent } from 'wirebird-client';

export const updatesHandler: RouteHandlerMethod = function (req, res) {
    this.updateEvents.pub(req.body as MonitorEvent);
    res.status(201).send(null);
};
