import { FC } from 'react';
import { ObjectInspector } from 'react-inspector';

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
    return <ObjectInspector data={tryParseJSON(data)} />;
};
