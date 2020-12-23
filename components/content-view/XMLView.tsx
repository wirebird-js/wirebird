import { FC } from 'react';
import { DOMInspector } from 'react-inspector';

const tryParseXML = (
    data: Buffer,
    contentType: DOMParserSupportedType
): Document | null => {
    try {
        const p = new DOMParser();
        return p.parseFromString(data.toString('utf8'), contentType);
    } catch (e) {
        return null;
    }
};

export interface IXMLViewProps {
    data: Buffer;
    contentType: string;
}

export const XMLView: FC<IXMLViewProps> = ({ data, contentType }) => {
    const doc = tryParseXML(data, contentType as DOMParserSupportedType);
    return doc ? <DOMInspector data={doc} /> : null;
};
