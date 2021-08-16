import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import React, { FC, useCallback, useMemo } from 'react';

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
    //Sometimes, when filters are restored form local storage,
    //there is no item in the lookup which corresponds to the current filter value.
    //In this case, we need to add it.
    const lookupsWithCurrentValueAdded = useMemo(
        () =>
            value === undefined ? lookup : { ...lookup, [`${value}`]: value },
        [lookup, value]
    );
    const lookupIsEfemeric = useMemo(
        () =>
            value === undefined
                ? false
                : !Object.prototype.hasOwnProperty.call(lookup, value),
        [lookup, value]
    );
    return (
        <TextField
            className={classes.root}
            select
            onChange={handleChange}
            value={value === undefined ? '' : value}
            label={label}
        >
            <MenuItem value="">All</MenuItem>

            {Object.entries(lookupsWithCurrentValueAdded).map(
                ([key, value]) => (
                    <MenuItem key={value} value={value}>
                        <Box fontStyle={lookupIsEfemeric ? 'italic' : 'normal'}>
                            {key}
                        </Box>
                    </MenuItem>
                )
            )}
        </TextField>
    );
};
