const domParserTypes = [
    'application/xhtml+xml',
    'application/xml',
    'image/svg+xml',
    'text/html',
    'text/xml',
];

type ViewType = 'plain' | 'image' | 'json' | 'xml' | 'form';

const plusSuffixRegex = /\+(\w+)/g;

export function detectType(contentType: string | null): {
    pureType: string;
    viewType: ViewType;
} {
    const [pureType] = contentType?.split(';') ?? [''];

    // https://trac.tools.ietf.org/html/draft-ietf-appsawg-media-type-suffix-regs-02
    const plusSuffices = new Set(
        Array.from(pureType.matchAll(plusSuffixRegex)).map(([, token]) => token)
    );

    if (!pureType || !contentType) {
        return { pureType, viewType: 'plain' };
    }
    if (contentType.startsWith('image/')) {
        return { pureType, viewType: 'image' };
    }
    if (pureType === 'application/json' || plusSuffices.has('json')) {
        return { pureType, viewType: 'json' };
    }
    if (domParserTypes.includes(pureType) || plusSuffices.has('xml')) {
        return { pureType, viewType: 'xml' };
    }
    if (pureType === 'application/x-www-form-urlencoded') {
        return { pureType, viewType: 'form' };
    }
    return { pureType, viewType: 'plain' };
}
