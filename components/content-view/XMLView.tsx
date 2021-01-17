import React, { FC } from 'react';
import { DOMInspector } from 'react-inspector';
import { useReactInspectorTheme } from '../../utils/useReactInspectorTheme';

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
    const theme = useReactInspectorTheme();
    const doc = tryParseXML(data, contentType as DOMParserSupportedType);
    return doc ? <DOMInspector theme={theme} data={doc} /> : null;
};
