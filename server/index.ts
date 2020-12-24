import chalk from 'chalk';
import { createServer, IncomingMessage, RequestListener } from 'http';
import { address as getMyIP } from 'ip';
import next from 'next';
import opener from 'opener';
import { join } from 'path';
import { parse } from 'url';
import { argv } from './argv';
import { ContextedRequest } from './ContextedRequest';
import SocketServer from './SocketServer';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const qrterm = require('qrcode-terminal');

export default async function main({
    production,
}: {
    production: boolean;
}): Promise<void> {
    const { headless, port } = argv();

    process.title = 'http-inspector-ui';
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
    }) as RequestListener).listen(port);

    const socketServer = new SocketServer({ server });
    const ip = getMyIP('public');

    const listenURL = `http://0.0.0.0:${port}`;
    const externalURL = `http://${ip}:${port}`;
    const localURL = `http://localhost:${port}`;

    qrterm.generate(externalURL);
    console.log('Use this QR-code to open on a mobile device\n');

    console.log(chalk`Listening at        : {bold ${listenURL}}`);
    console.log(chalk`Open on your machine: {bold ${localURL}}`);
    console.log(chalk`Open from your LAN  : {bold ${externalURL}}`);

    if (!headless) {
        opener(localURL);
    }
}

if (require.main === module) {
    main({ production: false });
}
