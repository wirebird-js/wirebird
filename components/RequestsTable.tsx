import makeStyles from '@material-ui/core/styles/makeStyles';
import classnames from 'classnames';
import { MonitorEvent } from 'wirebird-client';
import React, { FC, useCallback, useMemo } from 'react';
import DataGrid, { Column } from 'react-data-grid';
import { ColumnsSelection } from '../utils/Columns';
import { emptyObject } from '../utils/emptyObject';
import { shortenURL } from '../utils/shortenURL';

const useStyles = makeStyles(
    (theme) => ({
        table: {
            height    : '100%',
            minHeight : 350,
            fontFamily: theme.typography.fontFamily,
        },
        rowError: {
            color: theme.palette.error.main,
        },
    }),
    { name: 'RequestsTable' }
);

interface IRequestsTableProps {
    items: Array<MonitorEvent>;
    current?: string | null;
    onRowClick?: (rowId: string) => void;
    selectedColumns?: ColumnsSelection;
}

interface RTRow {
    id: string;
    name: string;
    requestURL: string;
    requestMethod: string;
    responseStatus?: number;
    kind: 'normal' | 'error';
}

const monitorEventToRow = (e: MonitorEvent): RTRow => {
    let kind: RTRow['kind'] = 'normal';
    if (e.error || e.response.status >= 400) {
        kind = 'error';
    }

    return {
        id            : e.request.id,
        name          : shortenURL(e.request.url),
        requestURL    : e.request.url,
        requestMethod : e.request.method,
        responseStatus: e.response?.status,
        kind,
    };
};

const rowKeyGetter = (row: RTRow): React.Key => {
    return row.id;
};

const useColumns = (selectedColumns: ColumnsSelection): Column<RTRow>[] => {
    const columns: Column<RTRow>[] = [
        {
            key      : 'name',
            name     : 'Name',
            resizable: true,
            formatter: ({ row, column: { key } }) => {
                return (
                    <span title={row.requestURL}>
                        {row[key as keyof RTRow]}
                    </span>
                );
            },
        },
        {
            key      : 'requestURL',
            name     : 'URL',
            resizable: true,
        },
        {
            key      : 'requestMethod',
            name     : 'Method',
            resizable: true,
        },
        {
            key      : 'responseStatus',
            name     : 'Status',
            resizable: true,
        },
    ];

    return useMemo(
        () =>
            columns.filter(
                ({ key }) => selectedColumns[key as keyof ColumnsSelection]
            ),
        [selectedColumns]
    );
};

const RequestsTable: FC<IRequestsTableProps> = ({
    items,
    onRowClick,
    current,
    selectedColumns = emptyObject,
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

    const rowClass = useCallback(
        (row) => classnames({ [classes.rowError]: row.kind === 'error' }),
        []
    );

    const columns = useColumns(selectedColumns);

    return (
        <DataGrid
            className={classes.table}
            columns={columns}
            rows={rows}
            rowKeyGetter={rowKeyGetter}
            onRowClick={handleRowClick}
            selectedRows={selectedRows}
            rowClass={rowClass}
        />
    );
};

export default RequestsTable;
