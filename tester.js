require('http-inspector/inject');
const Axios = require('axios');

const requests = [
    ['get', 'https://example.com'],
    ['post', 'https://example.com', {}],
    ['get', 'https://example.com/does-not-exist'],
    ['get', 'https://iueugfroiruthgi-does-not-exist.com'],
];

let currentRequest = 0;

function ping() {
    currentRequest++;
    currentRequest = currentRequest % requests.length;
    const [method, url, params] = requests[currentRequest];
    Axios[method](url, params);
}

function main() {
    setInterval(ping, 1000);
}

main();
