import { makeStyles, MenuItem, TextField } from '@material-ui/core';
import React, { FC, useCallback } from 'react';
import { Lookups } from '../redux/ducks/updates';
import { Filters, initialFilters } from '../utils/Filters';

type LookupValue = string | number | undefined;

const useStyles = makeStyles((theme) => ({
    lookupSelect: {
        minWidth: theme.spacing(10),
        maxWidth: theme.spacing(20),
    },
}));

interface ILookupSelectProps {
    onChange: (value: LookupValue) => void;
    value: LookupValue;
    label: string;
    lookup: { [key: string]: LookupValue };
}

const LookupSelect: FC<ILookupSelectProps> = ({
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
            className={classes.lookupSelect}
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

export interface IToolbarFiltersProps {
    lookups: Lookups;
    value?: Filters;
    onChange?: (value: Filters) => void;
}
export const ToolbarFilters: FC<IToolbarFiltersProps> = ({
    lookups,
    value = initialFilters,
    onChange,
}) => {
    const handlePIDChange = useCallback(
        (pid) => {
            if (pid === '') {
                pid = undefined;
            }
            onChange?.({ ...value, pid });
        },
        [onChange, value]
    );
    const handleDomainChange = useCallback(
        (domain) => {
            if (domain === '') {
                domain = undefined;
            }
            onChange?.({ ...value, domain });
        },
        [onChange, value]
    );
    return (
        <div>
            <LookupSelect
                label="pid"
                lookup={lookups.pid}
                onChange={handlePIDChange}
                value={value.pid}
            />
            <LookupSelect
                label="domain"
                lookup={lookups.domain}
                onChange={handleDomainChange}
                value={value.domain}
            />
        </div>
    );
};
