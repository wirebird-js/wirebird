import { NextApiRequest, NextApiResponse } from 'next';
import { ContextedRequest } from '../../server/ContextedRequest';
import { LoggerEvent } from 'http-inspector';

const post = (req: NextApiRequest & ContextedRequest, res: NextApiResponse) => {
    //TODO: validate using JSON schema
    const socketServer = req.context.socketServer;
    const body = req.body as LoggerEvent;
    socketServer.broadcastLoggerEvent(body);
    res.status(201).send(null);
};

export default (
    req: NextApiRequest & ContextedRequest,
    res: NextApiResponse
) => {
    if (req.method === 'POST') {
        post(req, res);
    } else {
        res.status(404).send(null);
    }
};
