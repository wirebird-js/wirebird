import { makeStyles } from '@material-ui/core';
import { MonitorEvent } from 'http-inspector';
import React, { FC, useCallback, useMemo } from 'react';
import DataGrid, { Column } from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';
import { shortenURL } from '../utils/shortenURL';

const useStyles = makeStyles((theme) => ({
    table: {
        height: '100%',
        minHeight: 350,
        fontFamily: theme.typography.fontFamily,
    },
}));

interface IRequestsTableProps {
    items: Array<MonitorEvent>;
    current?: string | null;
    onRowClick?: (rowId: string) => void;
}

interface RTRow {
    id: string;
    name: string;
    requestURL: string;
    requestMethod: string;
    responseStatus?: number;
}

const monitorEventToRow = (e: MonitorEvent): RTRow => {
    return {
        id: e.request.id,
        name: shortenURL(e.request.url),
        requestURL: e.request.url,
        requestMethod: e.request.method,
        responseStatus: e.response?.status,
    };
};

const columns: Column<RTRow>[] = [
    {
        key: 'name',
        name: 'Name',
        resizable: true,
        formatter: ({ row, column: { key } }) => {
            return (
                <span title={row.requestURL}>{row[key as keyof RTRow]}</span>
            );
        },
    },
    // {
    //     key: 'requestURL',
    //     name: 'URL',
    //     resizable: true,
    // },
    {
        key: 'requestMethod',
        name: 'Method',
        resizable: true,
    },
    {
        key: 'responseStatus',
        name: 'Status',
        resizable: true,
    },
];

const rowKeyGetter = (row: RTRow): React.Key => {
    return row.id;
};

const RequestsTable: FC<IRequestsTableProps> = ({
    items,
    onRowClick,
    current,
}) => {
    const classes = useStyles();

    const rows = items.map(monitorEventToRow);
    const handleRowClick = useCallback(
        (idx: number, row: RTRow) => {
            onRowClick?.(row.id);
        },
        [onRowClick]
    );

    const selectedRows: ReadonlySet<string> = useMemo(
        () => (current ? new Set([current]) : new Set()),
        [current]
    );

    return (
        <DataGrid
            className={classes.table}
            columns={columns}
            rows={rows}
            rowKeyGetter={rowKeyGetter}
            onRowClick={handleRowClick}
            selectedRows={selectedRows}
        />
    );
};

export default RequestsTable;
