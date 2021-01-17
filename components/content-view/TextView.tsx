import React from 'react';
import { makeStyles } from '@material-ui/core';
import { FC } from 'react';

const useStyles = makeStyles((theme) => ({
    pre: {
        wordBreak : 'break-all',
        whiteSpace: 'pre-wrap',
        fontFamily: 'monospace', //TODO: add font
        fontSize  : 13,
        color     : theme.palette.getContrastText(theme.palette.background.paper),
    },
}));

export interface ITextViewProps {
    data: Buffer | string;
}

export const TextView: FC<ITextViewProps> = ({ data }) => {
    const classes = useStyles();
    const strData = typeof data === 'string' ? data : data.toString('utf8');
    return <div className={classes.pre}>{strData}</div>;
};
