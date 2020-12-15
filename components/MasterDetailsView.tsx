import { makeStyles } from '@material-ui/core';
import { MonitorEvent } from 'http-inspector';
import React, { FC, useCallback } from 'react';
import { Filters, initialFilters } from '../utils/Filters';
import { EventDetailsView } from './EventDetailesView';
import { MasterDetailsLayout } from './MasterDetailsLayout';
import RequestsTable from './RequestsTable';
import { ToolbarFilters } from './ToolbarFilters';

const useStyles = makeStyles(theme => ({
    rightPanel: {
        height: '100%',
        borderLeftWidth: 1,
        borderLeftStyle: 'solid',
        borderLeftColor: theme.palette.divider,
    },
}));

export interface IMasterDetailsViewProps {
    items: Array<MonitorEvent>;
    currentItem?: MonitorEvent | null;
    onItemSelect?: (rowId: string) => void;
    onItemDeselect?: () => void;
    onFiltersChange?: (value: Filters) => void;
    filters?: Filters;
    pidsList?: string[];
}

export const MasterDetailsView: FC<IMasterDetailsViewProps> = ({
    items,
    currentItem,
    onItemSelect,
    onItemDeselect,
    pidsList = [],
    onFiltersChange,
    filters = initialFilters,
}) => {
    const handleRowClick = useCallback(
        rowId => {
            onItemSelect && onItemSelect(rowId);
        },
        [onItemSelect]
    );
    const handleDetailsClose = useCallback(() => {
        onItemDeselect && onItemDeselect();
    }, [onItemDeselect]);
    const handleFiltersChange = useCallback(
        filters => {
            onFiltersChange && onFiltersChange(filters);
        },
        [onFiltersChange]
    );

    const classes = useStyles();

    return (
        <MasterDetailsLayout
            toolbar={
                <ToolbarFilters
                    pids={pidsList}
                    onChange={handleFiltersChange}
                    value={filters}
                />
            }
            left={
                <RequestsTable
                    items={items}
                    current={currentItem ? currentItem.request.id : null}
                    onRowClick={handleRowClick}
                />
            }
            right={
                currentItem && (
                    <div className={classes.rightPanel}>
                        <EventDetailsView
                            event={currentItem}
                            onClose={handleDetailsClose}
                        />
                    </div>
                )
            }
        />
    );
};
