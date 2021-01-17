import chalk from 'chalk';
import F from 'fastify';
import { MonitorEvent } from 'http-inspector';
import { address as getMyIP } from 'ip';
import { argv } from './argv';
import { configureServer } from './configureServer';
import { PubSub } from './PubSub';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const qrterm = require('qrcode-terminal');

declare module 'fastify' {
    interface FastifyInstance {
        updateEvents: PubSub<MonitorEvent>;
    }
}

async function main() {
    const fastify = F({ logger: true });
    const { headless, port } = argv();
    const ip = getMyIP('public');
    const listenURL = `http://0.0.0.0:${port}`;
    const externalURL = `http://${ip}:${port}`;
    const localURL = `http://localhost:${port}`;
    qrterm.generate(externalURL);
    console.log('Use this QR-code to open on a mobile device\n');

    console.log(chalk`Listening at        : {bold ${listenURL}}`);
    console.log(chalk`Open on your machine: {bold ${localURL}}`);
    console.log(chalk`Open from your LAN  : {bold ${externalURL}}`);

    configureServer(fastify);
    await fastify.listen(port, '0.0.0.0');
}

if (require.main === module) {
    main().catch((e) => {
        console.error(e.stack || e);
        process.exit(1);
    });
}
