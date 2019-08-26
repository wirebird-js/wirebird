import { createServer, IncomingMessage, RequestListener } from 'http';
import { parse } from 'url';
import next from 'next';
import SocketServer from './SocketServer';
import { ContextedRequest } from './ContextedRequest';

const PORT = 4380;

export default async function main({ production }: { production: boolean }) {
    const dev = !production;
    const app = next({ dev });
    const handle = app.getRequestHandler();
    await app.prepare();
    const server = createServer(((
        req: IncomingMessage & ContextedRequest,
        res
    ) => {
        const parsedUrl = parse(req.url!, true);
        req.context = {
            socketServer
        };
        handle(req, res, parsedUrl);
    }) as RequestListener).listen(PORT);

    const socketServer = new SocketServer({ server });

    // tslint:disable-next-line:no-console
    console.log(`> Server listening at http://localhost:${PORT}`);
}

if (require.main === module) {
    main({ production: false });
}
