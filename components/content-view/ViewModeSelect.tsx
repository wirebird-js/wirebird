import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import React, { FC, useCallback } from 'react';
import { ViewMode, viewModes } from './viewModes';

interface IViewModeSelectProps {
    value: ViewMode;
    onChange: (value: ViewMode) => void;
}

export const ViewModeSelect: FC<IViewModeSelectProps> = ({
    value,
    onChange,
}) => {
    const handleChange = useCallback((e, value) => onChange(value), [onChange]);

    return (
        <ToggleButtonGroup
            size="small"
            value={value}
            exclusive
            orientation="horizontal"
            onChange={handleChange}
        >
            {Object.entries(viewModes).map(([mode, name]) => (
                <ToggleButton key={mode} value={mode}>
                    {name}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
};
