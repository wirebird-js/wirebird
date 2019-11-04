import { LoggerEvent } from 'http-inspector';

const items: Array<LoggerEvent> = [
    {
        request: {
            body: null,
            headers: {},
            id: 'id1',
            method: 'GET',
            timeStart: 1000,
            url: 'https://example.com'
        },
        response: {
            body: new Buffer('Hello world', 'utf8'),
            headers: {},
            status: 200,
            timeStart: 1001
        },
        error: null
    },
    {
        request: {
            body: new Buffer('{"hello":"world"}', 'utf8'),
            headers: {
                'content-type': 'application/json'
            },
            id: 'id2',
            method: 'POST',
            timeStart: 2000,
            url: 'https://example.com'
        },
        response: {
            body: new Buffer('Internal server error', 'utf8'),
            headers: {},
            status: 500,
            timeStart: 2001
        },
        error: null
    }
];

export default items;
