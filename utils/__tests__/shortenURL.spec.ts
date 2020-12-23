import { shortenURL } from '../shortenURL';

describe('shortenURL', () => {
    it('should shorten URLs', () => {
        expect(shortenURL('https://www.fillmurray.com/250/250')).toEqual('250');

        expect(
            shortenURL('data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D')
        ).toEqual('data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D');

        expect(shortenURL('https://example.com/')).toEqual('example.com');
        expect(shortenURL('https://example.com/hello')).toEqual('hello');
        expect(shortenURL('https://example.com/hello.js')).toEqual('hello.js');
        expect(shortenURL('https://example.com/hello.js?a=b')).toEqual(
            'hello.js?a=b'
        );
    });
});
