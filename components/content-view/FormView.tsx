import qs from 'querystring';
import { FC } from 'react';
import { ObjectInspector } from 'react-inspector';
import { useReactInspectorTheme } from '../../utils/useReactInspectorTheme';

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
    const theme = useReactInspectorTheme();
    return <ObjectInspector theme={theme} data={tryParseForm(data)} />;
};
