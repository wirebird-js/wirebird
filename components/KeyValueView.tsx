import { makeStyles, Typography } from '@material-ui/core';
import React, { FC } from 'react';

const useStyles = makeStyles(() => ({
    root: {
        flexDirection: 'column',
    },
    row: {
        wordBreak: 'break-all',
        whiteSpace: 'pre-wrap',
    },
    rowKey: {
        fontSize: 13,
    },
    rowValue: {
        fontFamily: 'monospace', //TODO: add font
    },
}));

export interface KeyValue {
    key: string;
    value: string;
}

export interface IKeyValueViewProps {
    items: KeyValue[];
}

export const KeyValueView: FC<IKeyValueViewProps> = ({ items }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {items.map((item, i) => (
                <Typography key={i} variant="body2" className={classes.row}>
                    <strong className={classes.rowKey}>{item.key}:</strong>{' '}
                    <span className={classes.rowValue}>{item.value}</span>
                </Typography>
            ))}
        </div>
    );
};
