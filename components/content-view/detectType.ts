export function detectType(
    contentType: string | null
): 'plain' | 'image' | 'json' {
    if (contentType === null) {
        return 'plain';
    }
    if (contentType.startsWith('image/')) {
        return 'image';
    }
    if (contentType.startsWith('application/json')) {
        return 'json';
    }
    return 'plain';
}
