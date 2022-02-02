import makeStyles from '@material-ui/core/styles/makeStyles';
import { MonitorEvent } from 'wirebird-client';
import React, { FC, useCallback } from 'react';
import { ColumnsSelection } from '../utils/Columns';
import { emptyObject } from '../utils/emptyObject';
import { EventDetailsView } from './EventDetailsView';
import { MasterDetailsLayout } from './MasterDetailsLayout';
import RequestsTable from './RequestsTable';
import { Toolbar } from './Toolbar';
import { useToolbarContext } from './toolbar/ToolbarContext';

const useStyles = makeStyles((theme) => ({
    rightPanel: {
        height         : '100%',
        borderLeftWidth: 1,
        borderLeftStyle: 'solid',
        borderLeftColor: theme.palette.divider,
    },
}));

export interface IMasterDetailsViewProps {
    selectedColumns?: ColumnsSelection;
    items: Array<MonitorEvent>;
    currentItem?: MonitorEvent | null;
    onItemSelect?: (rowId: string) => void;
    onItemDeselect?: () => void;
}

export const MasterDetailsView: FC<IMasterDetailsViewProps> = ({
    items,
    currentItem,
    onItemSelect,
    onItemDeselect,
    selectedColumns = emptyObject,
}) => {
    const handleRowClick = useCallback(
        (rowId) => {
            onItemSelect?.(rowId);
        },
        [onItemSelect]
    );
    const handleDetailsClose = useCallback(() => {
        onItemDeselect?.();
    }, [onItemDeselect]);

    const classes = useStyles();
    const toolbar = useToolbarContext();

    return (
        <MasterDetailsLayout
            toolbar={<Toolbar {...toolbar} />}
            left={
                <RequestsTable
                    selectedColumns={selectedColumns}
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
