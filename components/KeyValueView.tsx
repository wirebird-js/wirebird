import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React, { FC } from 'react';

const useStyles = makeStyles(() => ({
    root: {
        flexDirection: 'column',
    },
    row: {
        wordBreak : 'break-all',
        whiteSpace: 'pre-wrap',
    },
    rowKey: {
        fontSize: 13,
    },
    rowValue: {
        fontFamily: 'monospace', //TODO: add font
    },
}));

type Value = string | number | undefined;

export interface KeyValue {
    key: string;
    value: Value | Value[];
}

export interface IKeyValueViewProps {
    items: KeyValue[];
}

const Pair: FC<{ k: string; v: Value }> = ({ k, v }) => {
    const classes = useStyles();
    return (
        <Typography variant="body2" className={classes.row}>
            <strong className={classes.rowKey}>{k}:</strong>{' '}
            <span className={classes.rowValue}>{v}</span>
        </Typography>
    );
};

export const KeyValueView: FC<IKeyValueViewProps> = ({ items }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {items.map((item, i) =>
                Array.isArray(item.value) ? (
                    item.value.map((v, j) => (
                        <Pair key={`${i}:${j}`} k={item.key} v={v} />
                    ))
                ) : (
                    <Pair key={i} k={item.key} v={item.value} />
                )
            )}
        </div>
    );
};
