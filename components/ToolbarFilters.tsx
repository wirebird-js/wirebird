import { MenuItem, TextField } from '@material-ui/core';
import React, { FC, useCallback } from 'react';
import { Lookups } from '../redux/ducks/updates';
import { Filters, initialFilters } from '../utils/Filters';

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
    const handlePIDChange = useCallback(({ target: { value: pid } }) => {
        if (pid === '') {
            pid = undefined;
        }
        onChange?.({ ...value, pid });
    }, []);
    return (
        <div>
            <TextField
                select
                onChange={handlePIDChange}
                value={value.pid === undefined ? '' : value.pid}
                label="PID"
            >
                <MenuItem value="">All</MenuItem>

                {Object.entries(lookups.pid).map(([key, value]) => (
                    <MenuItem key={value} value={value}>
                        {key}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    );
};
