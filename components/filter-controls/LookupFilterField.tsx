import { makeStyles, MenuItem, TextField } from '@material-ui/core';
import React, { FC, useCallback } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: theme.spacing(10),
        maxWidth: theme.spacing(20),
    },
}));

type LookupValue = string | number | undefined;

export interface ILookupFilterFieldProps {
    onChange: (value: LookupValue) => void;
    value: LookupValue;
    label: string;
    lookup: { [key: string]: LookupValue };
}

export const LookupFilterField: FC<ILookupFilterFieldProps> = ({
    onChange,
    value,
    label,
    lookup,
}) => {
    const handleChange = useCallback(
        ({ target: { value } }) => onChange(value),
        [onChange]
    );
    const classes = useStyles();
    return (
        <TextField
            className={classes.root}
            select
            onChange={handleChange}
            value={value === undefined ? '' : value}
            label={label}
        >
            <MenuItem value="">All</MenuItem>

            {Object.entries(lookup).map(([key, value]) => (
                <MenuItem key={value} value={value}>
                    {key}
                </MenuItem>
            ))}
        </TextField>
    );
};
