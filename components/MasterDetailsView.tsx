import { Grid, GridSize, makeStyles } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { LoggerEvent } from 'http-inspector';
import React, { FC, useCallback, useMemo } from 'react';
import { EventDetailsView } from './EventDetailesView';
import RequestsTable from './RequestsTable';

const SIZES_LEFT_PANEL_SHRUNK: Partial<
    Record<Breakpoint, boolean | GridSize>
> = {
    xs: 6,
    md: 3,
};
const SIZES_LEFT_PANEL_WIDE: Partial<Record<Breakpoint, boolean | GridSize>> = {
    xs: 12,
};

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    leftPanel: {
        height: '100%',
        overflowY: 'auto',
    },
    rightPanel: {
        height: '100%',
        overflowY: 'auto',
    },
}));

export interface IMasterDetailsViewProps {
    items: Array<LoggerEvent>;
    current?: string | null;
    onItemSelect?: (rowId: string) => void;
    onItemDeselect?: () => void;
}

export const MasterDetailsView: FC<IMasterDetailsViewProps> = ({
    items,
    current,
    onItemSelect,
    onItemDeselect,
}) => {
    const handleRowClick = useCallback(
        (rowId) => {
            onItemSelect && onItemSelect(rowId);
        },
        [onItemSelect]
    );
    const handleDetailsClose = useCallback(() => {
        onItemDeselect && onItemDeselect();
    }, [onItemDeselect]);

    const currentItem = useMemo(
        () => items.find((item) => item.request.id === current),
        [items, current]
    );

    const leftPanelSizes: Partial<
        Record<Breakpoint, boolean | GridSize>
    > = currentItem ? SIZES_LEFT_PANEL_SHRUNK : SIZES_LEFT_PANEL_WIDE;

    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item {...leftPanelSizes} className={classes.leftPanel}>
                <RequestsTable
                    items={items}
                    current={current}
                    onRowClick={handleRowClick}
                />
            </Grid>

            {currentItem && (
                <Grid item xs={6} md={9} className={classes.rightPanel}>
                    <EventDetailsView
                        event={currentItem}
                        onClose={handleDetailsClose}
                    />
                </Grid>
            )}
        </Grid>
    );
};
