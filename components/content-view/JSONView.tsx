import React from 'react';
import { FC } from 'react';
import { ObjectInspector } from 'react-inspector';
import { useReactInspectorTheme } from '../../utils/useReactInspectorTheme';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tryParseJSON = (buf: Buffer): any => {
    const str = buf.toString('utf8');
    try {
        return JSON.parse(str);
    } catch (e) {
        return str;
    }
};

export interface IJSONViewProps {
    data: Buffer;
}

export const JSONView: FC<IJSONViewProps> = ({ data }) => {
    const theme = useReactInspectorTheme();
    return <ObjectInspector theme={theme} data={tryParseJSON(data)} />;
};
