import { SerializedLoggerEvent, validate } from 'http-inspector';
import { NextApiRequest, NextApiResponse } from 'next';
import { ContextedRequest } from '../../server/ContextedRequest';

const post = (req: NextApiRequest & ContextedRequest, res: NextApiResponse) => {
    const { socketServer } = req.context;
    const body = req.body as SerializedLoggerEvent;
    const validationResult = validate(body);
    if (validationResult.valid) {
        res.status(201).send(null);
    } else {
        console.warn('An event of invalid format is received');
        console.warn(
            validationResult.errors
                .map(
                    ({ path, message }, i) =>
                        `${i}) "${
                            path.length ? path.join('.') : '<root>'
                        }": ${message}`
                )
                .join('\n')
        );
        res.status(201).send({ warning: validationResult.errors });
    }
    socketServer.broadcastLoggerEvent(body);
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
