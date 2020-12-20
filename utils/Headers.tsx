import { LoggerEvent } from 'http-inspector';

type HeaderDict = LoggerEvent['request']['headers'];
type HeaderVal = HeaderDict[string];

export class Headers {
    private normalizedHeaders: HeaderDict;
    private normalizeName(name: string): string {
        return name.toLowerCase();
    }
    constructor(private rawHeaders: HeaderDict) {
        this.normalizedHeaders = Object.entries(
            this.rawHeaders
        ).reduce<HeaderDict>(
            (headers, [name, value]) => (
                (headers[this.normalizeName(name)] = value), headers
            ),
            {}
        );
    }
    public get(name: string): HeaderVal {
        return this.normalizedHeaders[this.normalizeName(name)];
    }
}
