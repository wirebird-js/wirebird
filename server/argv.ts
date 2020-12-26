import yargs from 'yargs';

export interface Argv {
    headless: boolean;
    port: number;
}

export const argv = (): Argv =>
    yargs.env().options({
        headless: {
            alias   : 'H',
            type    : 'boolean',
            default : false,
            describe: 'Do not open browser',
        },
        port: {
            alias  : 'p',
            type   : 'number',
            default: 4380,
        },
    }).argv;
