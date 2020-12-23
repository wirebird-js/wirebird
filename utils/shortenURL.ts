import { parse } from 'url';
import { basename } from 'path';

export function shortenURL(input: string): string {
    const u = parse(input);
    const { search, protocol, host, pathname } = u;

    if (protocol === 'data:') {
        return input.substr(0, 200);
    }

    const pathBaseName = pathname ? basename(pathname) : null;

    if (pathBaseName && pathBaseName !== '') {
        return `${pathBaseName}${search ?? ''}`;
    }
    if (host) {
        return host;
    }
    return 'unknown';
}
