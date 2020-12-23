import { makeStyles } from '@material-ui/core';
import { FC } from 'react';

const useStyles = makeStyles(() => ({
    pre: {
        wordBreak: 'break-all',
        whiteSpace: 'pre-wrap',
        fontFamily: 'monospace', //TODO: add font
        fontSize: 13,
    },
}));

export interface ITextViewProps {
    data: Buffer;
}

export const TextView: FC<ITextViewProps> = ({ data }) => {
    const classes = useStyles();
    return <div className={classes.pre}>{data.toString('utf8')}</div>;
};
