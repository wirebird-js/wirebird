export class Headers {
    private normalizedHeaders: { [k: string]: string };
    private normalizeName(name: string): string {
        return name.toLowerCase();
    }
    constructor(private rawHeaders: { [k: string]: string }) {
        debugger;
        this.normalizedHeaders = Object.entries(this.rawHeaders).reduce<{
            [k: string]: string;
        }>(
            (headers, [name, value]) => (
                (headers[this.normalizeName(name)] = value), headers
            ),
            {}
        );
    }
    public get(name: string): string {
        return this.normalizedHeaders[this.normalizeName(name)];
    }
}
