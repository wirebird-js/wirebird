import { MenuItem, TextField } from '@material-ui/core';
import { FC, useCallback, useMemo } from 'react';

enum Columns {
    name = 'Name',
    requestMethod = 'Method',
    responseStatus = 'Status',
    requestURL = 'URL',
}

type ColumnName = keyof typeof Columns;

export type ColumnsSelection = {
    [CName in ColumnName]?: boolean;
};

interface IColumnsSelectProps {
    value: ColumnsSelection;
    onChange?: (value: ColumnsSelection) => void;
}

export const ColumnsSelect: FC<IColumnsSelectProps> = ({
    onChange,
    value = {},
}) => {
    const valueList = useMemo(
        () => Object.keys(Columns).filter((key) => value[key as ColumnName]),
        [value]
    );

    const handleChange = useCallback(
        ({ target: { value } }) => {
            const result: ColumnsSelection = value.reduce(
                (res: ColumnsSelection, key: ColumnName) => {
                    res[key] = true;
                    return res;
                },
                {}
            );
            onChange?.(result);
        },
        [onChange]
    );

    const renderValue = (value: unknown) =>
        Array.isArray(value) ? `Columns(${value.length})` : '';

    return (
        <TextField
            select
            value={valueList}
            onChange={handleChange}
            SelectProps={{ multiple: true, renderValue }}
        >
            {Object.entries(Columns).map(([key, label], i) => (
                <MenuItem key={i} value={key}>
                    {label}
                </MenuItem>
            ))}
        </TextField>
    );
};
