import { join } from 'path';
import { createServer, IncomingMessage, RequestListener } from 'http';
import { parse } from 'url';
import next from 'next';
import SocketServer from './SocketServer';
import { ContextedRequest } from './ContextedRequest';

const PORT = 4380;

export default async function main({
    production,
}: {
    production: boolean;
}): Promise<void> {
    const dev = !production;
    const app = next({ dev, dir: join(__dirname, '..') });
    const handle = app.getRequestHandler();
    await app.prepare();
    const server = createServer(((
        req: IncomingMessage & ContextedRequest,
        res
    ) => {
        if (!req.url) {
            throw new Error('No req.url');
        }
        const parsedUrl = parse(req.url, true);
        req.context = {
            socketServer,
        };
        handle(req, res, parsedUrl);
    }) as RequestListener).listen(PORT);

    const socketServer = new SocketServer({ server });

    console.log(`Server listening at http://localhost:${PORT}`);
}

if (require.main === module) {
    main({ production: false });
}
