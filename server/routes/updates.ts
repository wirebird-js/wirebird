import { RouteHandlerMethod } from 'fastify';
import { MonitorEvent } from 'http-inspector';

export const updatesHandler: RouteHandlerMethod = function (req, res) {
    //TODO: validate
    this.updateEvents.pub(req.body as MonitorEvent);
    res.status(201).send(null);
};
