import { createServer, IncomingMessage, RequestListener } from 'http';
import { parse } from 'url';
import next from 'next';
import SocketServer from './SocketServer';
import * as SocketServerFactory from './SocketServerFactory';
import { ContextedRequest } from './ContextedRequest';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

async function main() {
    await app.prepare();
    const server = createServer(((
        req: IncomingMessage & ContextedRequest,
        res
    ) => {
        const parsedUrl = parse(req.url!, true);
        req.context = {
            socketServer: SocketServerFactory.get()
        };
        handle(req, res, parsedUrl);
    }) as RequestListener).listen(port);

    SocketServerFactory.init({ server });

    // tslint:disable-next-line:no-console
    console.log(
        `> Server listening at http://localhost:${port} as ${
            dev ? 'development' : process.env.NODE_ENV
        }`
    );
}

main();
