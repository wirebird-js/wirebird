import { detectType } from '../detectType';

describe('detectType', function () {
    it('should work', function () {
        expect(detectType('application/json')).toEqual({
            pureType: 'application/json',
            viewType: 'json',
        });

        expect(detectType('application/json; charset=utf-8')).toEqual({
            pureType: 'application/json',
            viewType: 'json',
        });

        expect(detectType('application/json; charset=utf-8; foo=bar')).toEqual({
            pureType: 'application/json',
            viewType: 'json',
        });

        expect(detectType(null)).toEqual({
            pureType: '',
            viewType: 'plain',
        });
    });
});
