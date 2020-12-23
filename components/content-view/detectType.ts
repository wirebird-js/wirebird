const domParserTypes = [
    'application/xhtml+xml',
    'application/xml',
    'image/svg+xml',
    'text/html',
    'text/xml',
];

export function detectType(
    contentType: string | null
): { pureType: string; viewType: 'plain' | 'image' | 'json' | 'xml' } {
    const [pureType] = contentType?.split(';') ?? [];

    if (!pureType || !contentType) {
        return { pureType, viewType: 'plain' };
    }
    if (contentType.startsWith('image/')) {
        return { pureType, viewType: 'image' };
    }
    if (pureType === 'application/json') {
        return { pureType, viewType: 'json' };
    }
    if (domParserTypes.includes(pureType)) {
        return { pureType, viewType: 'xml' };
    }
    return { pureType, viewType: 'plain' };
}
