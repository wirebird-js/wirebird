import { MenuItem, TextField } from '@material-ui/core';
import { FC, ReactNode, useCallback, useMemo } from 'react';
import { ColumnName, Columns, ColumnsSelection } from '../utils/Columns';

interface IColumnsSelectProps {
    value: ColumnsSelection;
    onChange?: (value: ColumnsSelection) => void;
    label?: ReactNode;
}

export const ColumnsSelect: FC<IColumnsSelectProps> = ({
    onChange,
    label,
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
            label={label}
        >
            {Object.entries(Columns).map(([key, label], i) => (
                <MenuItem key={i} value={key}>
                    {label}
                </MenuItem>
            ))}
        </TextField>
    );
};
