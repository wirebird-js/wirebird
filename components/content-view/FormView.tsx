import { FC } from 'react';
import { ObjectInspector } from 'react-inspector';
import qs from 'querystring';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tryParseForm = (buf: Buffer): any => {
    const str = buf.toString('utf8');
    try {
        return qs.parse(str);
    } catch (e) {
        return str;
    }
};

export interface IFormViewProps {
    data: Buffer;
}

export const FormView: FC<IFormViewProps> = ({ data }) => {
    return <ObjectInspector data={tryParseForm(data)} />;
};
