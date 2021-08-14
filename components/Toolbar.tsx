import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Clear from '@material-ui/icons/Clear';
import React, { FC, useCallback, useMemo } from 'react';
import { Lookups } from '../redux/ducks/updates';
import { emptyObject } from '../utils/emptyObject';
import { Filters, initialFilters } from '../utils/Filters';
import { ColumnsSelect } from './ColumnsSelect';
import { LookupFilterField } from './filter-controls/LookupFilterField';
import { TextFilterField } from './filter-controls/TextFilterField';
import { IToolbarContextProps } from './toolbar/ToolbarContext';

const createFieldUpdater = (
    fieldName: keyof Filters,
    value: IToolbarContextProps['filters'],
    onChange: IToolbarContextProps['onChangeFilters']
) => (fieldValue: string | number | undefined) => {
    if (fieldValue === '') {
        fieldValue = undefined;
    }
    onChange?.({ ...value, [fieldName]: fieldValue });
};

export const Toolbar: FC<IToolbarContextProps> = React.memo(
    ({
        lookups = emptyObject as Partial<Lookups>,
        filters: value = initialFilters,
        showResetFilters,
        columnsSelection = emptyObject,
        onResetFilters,
        onChangeFilters,
        onChangeColumns,
    }) => {
        const handlePIDChange = useMemo(
            () => createFieldUpdater('pid', value, onChangeFilters),
            [onChangeFilters, value]
        );
        const handleSearchChange = useMemo(
            () => createFieldUpdater('search', value, onChangeFilters),
            [onChangeFilters, value]
        );
        const handleDomainChange = useMemo(
            () => createFieldUpdater('domain', value, onChangeFilters),
            [onChangeFilters, value]
        );
        const handleMethodChange = useMemo(
            () => createFieldUpdater('method', value, onChangeFilters),
            [onChangeFilters, value]
        );
        const handleReset = useCallback(() => {
            onResetFilters?.();
        }, [onResetFilters]);
        return (
            <Grid container spacing={1}>
                <Grid item>
                    <LookupFilterField
                        label="PID"
                        lookup={lookups.pid ?? emptyObject}
                        onChange={handlePIDChange}
                        value={value.pid}
                    />
                </Grid>
                <Grid item>
                    <LookupFilterField
                        label="Domain"
                        lookup={lookups.domain ?? emptyObject}
                        onChange={handleDomainChange}
                        value={value.domain}
                    />
                </Grid>
                <Grid item>
                    <LookupFilterField
                        label="Method"
                        lookup={lookups.method ?? emptyObject}
                        onChange={handleMethodChange}
                        value={value.method}
                    />
                </Grid>
                <Grid item>
                    <TextFilterField
                        label="Search"
                        onChange={handleSearchChange}
                        value={value.search}
                    />
                </Grid>
                <Grid item>
                    <ColumnsSelect
                        label="Columns"
                        value={columnsSelection}
                        onChange={onChangeColumns}
                    />
                </Grid>
                {showResetFilters && (
                    <Grid item>
                        <Box height="100%" display="flex">
                            <Button variant="outlined" onClick={handleReset}>
                                <Clear />
                            </Button>
                        </Box>
                    </Grid>
                )}
            </Grid>
        );
    }
);
