const domParserTypes = [
    'application/xhtml+xml',
    'application/xml',
    'image/svg+xml',
    'text/html',
    'text/xml',
];

type ViewType = 'plain' | 'image' | 'json' | 'xml' | 'form';

export function detectType(
    contentType: string | null
): { pureType: string; viewType: ViewType } {
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
    if (pureType === 'application/x-www-form-urlencoded') {
        return { pureType, viewType: 'form' };
    }
    return { pureType, viewType: 'plain' };
}
