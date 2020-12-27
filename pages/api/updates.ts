import { SerializedLoggerEvent, validate } from 'http-inspector';
import { NextApiRequest, NextApiResponse } from 'next';
import { ContextedRequest } from '../../server/ContextedRequest';

const post = (req: NextApiRequest & ContextedRequest, res: NextApiResponse) => {
    const { socketServer } = req.context;
    const body = req.body as SerializedLoggerEvent;
    const validationResult = validate(body);
    if (validationResult.valid) {
        socketServer.broadcastLoggerEvent(body);
        res.status(201).send(null);
    } else {
        console.log('Invalid payload');
        res.status(400).send({ error: validationResult.errors });
    }
};

export default (
    req: NextApiRequest & ContextedRequest,
    res: NextApiResponse
): void => {
    if (req.method === 'POST') {
        post(req, res);
    } else {
        res.status(404).send(null);
    }
};
