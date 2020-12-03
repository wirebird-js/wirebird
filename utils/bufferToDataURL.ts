export const bufferToDataURL = (mimeType: string, buffer: Buffer): string => {
    return `data:${mimeType};base64,${buffer.toString('base64')}`;
};
