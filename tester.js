require('http-inspector/inject');
const Axios = require('axios');
const qs = require('querystring');
const sleep = require('sleep-promise');

const requests = [
    ['get', 'https://example.com'],
    ['get', 'https://httpbin.org/xml'],
    [
        'get',
        'https://httpbin.org/get',
        {
            headers: {
                hello: ['foo', 'bar'],
            },
        },
    ],
    ['post', 'https://example.com', {}],
    [
        'post',
        'https://example.com/form',
        qs.stringify({ foo: 'bar', items: [1, 2, 3] }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        },
    ],
    ['get', 'https://example.com/does-not-exist'],
    ['get', 'https://iueugfroiruthgi-does-not-exist.com'],
    ['get', 'https://www.fillmurray.com/250/250'],
    ['get', 'https://jsonplaceholder.typicode.com/todos'],
    ['post', 'https://httpbin.org/post', { hello: 'world' }],
];

let currentRequest = 0;

async function ping() {
    currentRequest++;
    currentRequest = currentRequest % requests.length;
    const [method, url, params] = requests[currentRequest];
    try {
        await Axios[method](url, params);
    } catch (e) {
        console.log(`Error: ${e.message}`);
    }
}

async function main() {
    for (;;) {
        await ping();
        await sleep(1000);
    }
}

main();
