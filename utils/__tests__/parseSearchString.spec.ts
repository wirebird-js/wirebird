import { parseSearchString } from '../parseSearchString';

parseSearchString;

describe('parseSearchString', () => {
    it('parses an advanced search string into an object', () => {
        expect(parseSearchString('method:POST')).toEqual({
            method: new Set(['POST']),
            domain: new Set(),
            text  : '',
        });
        expect(parseSearchString('method:POST method:GET')).toEqual({
            method: new Set(['POST', 'GET']),
            domain: new Set(),
            text  : '',
        });
        expect(parseSearchString('method:POST method:GET method:PUT')).toEqual({
            method: new Set(['POST', 'GET', 'PUT']),
            domain: new Set(),
            text  : '',
        });
        expect(parseSearchString('domain:example.com')).toEqual({
            method: new Set(),
            domain: new Set(['example.com']),
            text  : '',
        });
        expect(
            parseSearchString('domain:example.com domain:example.org')
        ).toEqual({
            method: new Set(),
            domain: new Set(['example.com', 'example.org']),
            text  : '',
        });
        expect(parseSearchString('method:POST domain:example.org')).toEqual({
            method: new Set(['POST']),
            domain: new Set(['example.org']),
            text  : '',
        });
        expect(parseSearchString('hello method:POST world')).toEqual({
            method: new Set(['POST']),
            domain: new Set(),
            text  : 'hello world',
        });
        expect(parseSearchString('hello method:POST method:GET world')).toEqual(
            {
                method: new Set(['POST', 'GET']),
                domain: new Set(),
                text  : 'hello world',
            }
        );
    });
});
