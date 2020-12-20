import { MonitorEvent } from 'http-inspector';

const items: Array<MonitorEvent> = [
    {
        processData: {
            mainModule: '/app/index.js',
            pid: 100,
            title: 'node',
        },
        request: {
            body: null,
            headers: {
                Connection: 'keep-alive',
                Pragma: 'no-cache',
                'Cache-Control': 'no-cache',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent':
                    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.193 Safari/537.36',
                Accept:
                    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language':
                    'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6,pt;q=0.5',
            },
            id: 'id1',
            method: 'GET',
            timeStart: 1000,
            url: 'https://example.com',
        },
        response: {
            body: new Buffer('Hello world', 'utf8'),
            rawHeaders: [
                'Content-Encoding',
                'gzip',
                'Age',
                '592103',
                'Cache-Control',
                'max-age=604800',
                'Content-Type',
                'text/html; charset=UTF-8',
                'Date',
                'Sat, 28 Nov 2020 13:10:29 GMT',
                'Etag',
                '"3147526947+gzip"',
                'Expires',
                'Sat, 05 Dec 2020 13:10:29 GMT',
                'Last-Modified',
                'Thu, 17 Oct 2019 07:18:26 GMT',
                'Server',
                'ECS (dcb/7F18)',
                'Vary',
                'Accept-Encoding',
                'X-Cache',
                'HIT',
                'Content-Length',
                '648',
            ],
            headers: {
                'Content-Encoding': 'gzip',
                Age: '592103',
                'Cache-Control': 'max-age=604800',
                'Content-Type': 'text/html; charset=UTF-8',
                Date: 'Sat, 28 Nov 2020 13:10:29 GMT',
                Etag: '"3147526947+gzip"',
                Expires: 'Sat, 05 Dec 2020 13:10:29 GMT',
                'Last-Modified': 'Thu, 17 Oct 2019 07:18:26 GMT',
                Server: 'ECS (dcb/7F18)',
                Vary: 'Accept-Encoding',
                'X-Cache': 'HIT',
                'Content-Length': '648',
            },
            status: 200,
            timeStart: 1001,
        },
        error: null,
    },
    {
        processData: {
            mainModule: '/app/index.js',
            pid: 100,
            title: 'node',
        },
        request: {
            body: new Buffer('{"hello":"world"}', 'utf8'),
            headers: {
                'content-type': 'application/json',
            },
            id: 'id2',
            method: 'POST',
            timeStart: 2000,
            url: 'https://example.com',
        },
        response: {
            body: new Buffer('Internal server error', 'utf8'),
            rawHeaders: [],
            headers: {},
            status: 500,
            timeStart: 2001,
        },
        error: null,
    },
    {
        processData: {
            mainModule: '/app/index.js',
            pid: 100,
            title: 'node',
        },
        request: {
            body: new Buffer('{"hello":"world"}', 'utf8'),
            headers: {
                'content-type': 'application/json',
            },
            id: 'id3',
            method: 'POST',
            timeStart: 2000,
            url: 'https://non-existing-asdhfsdiufhsd.com',
        },
        error: {
            code: 'E_LOOKUP',
            message: 'Could not find address non-existing-asdhfsdiufhsd.com',
            stack: 'Lorem ipsum',
        },
        response: null,
    },
];

for (let i = 0; i < 100; i++) {
    items.push({
        ...items[0],
        request: { ...items[0].request, id: `additional_${i}` },
    });
}

export default items;
