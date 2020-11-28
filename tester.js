require('http-inspector/inject');
const Axios = require('axios');

function ping() {
    Axios.get('https://example.com');
}

function main() {
    setInterval(ping, 1000);
}

main();
