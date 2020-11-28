import { makeStyles, Typography } from '@material-ui/core';
import React, { FC } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        flexDirection: 'column',
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
                <Typography key={i} variant="body2">
                    <strong>{item.key}:</strong> <span>{item.value}</span>
                </Typography>
            ))}
        </div>
    );
};
