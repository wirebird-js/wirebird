import { Grid, GridSize, makeStyles } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { MonitorEvent } from 'http-inspector';
import React, { FC, useCallback, useMemo } from 'react';
import { EventDetailsView } from './EventDetailesView';
import { MasterDetailsLayout } from './MasterDetailsLayout';
import RequestsTable from './RequestsTable';

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
    pidsList?: string[];
}

export const MasterDetailsView: FC<IMasterDetailsViewProps> = ({
    items,
    currentItem,
    onItemSelect,
    onItemDeselect,
    pidsList,
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

    const classes = useStyles();

    return (
        <MasterDetailsLayout
            toolbar={'asd'}
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
