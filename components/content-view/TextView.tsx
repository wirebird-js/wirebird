import { FC } from 'react';

export interface ITextViewProps {
    data: Buffer;
}

export const TextView: FC<ITextViewProps> = ({ data }) => {
    return <pre>{data.toString('utf8')}</pre>;
};
