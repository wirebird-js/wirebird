import { MenuItem, TextField } from '@material-ui/core';
import React, { FC, useCallback } from 'react';
import { Filters, initialFilters } from '../utils/Filters';

export interface IToolbarFiltersProps {
    pids: string[];
    value?: Filters;
    onChange?: (value: Filters) => void;
}
export const ToolbarFilters: FC<IToolbarFiltersProps> = ({
    pids,
    value = initialFilters,
    onChange,
}) => {
    const handlePIDChange = useCallback(({ target: { value: pid } }) => {
        onChange && onChange({ ...value, pid });
    }, []);
    return (
        <div>
            <TextField
                select
                onChange={handlePIDChange}
                value={value.pid}
                label="PID"
            >
                <MenuItem value="">All</MenuItem>

                {pids.map(pid => (
                    <MenuItem key={pid} value={pid}>
                        {pid}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    );
};
