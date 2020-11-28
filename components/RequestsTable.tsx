import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { LoggerEvent } from 'http-inspector';
import React, { FC } from 'react';
import RequestsTableRow from './RequestTableRow';

interface IRequestsTableProps {
    items: Array<LoggerEvent>;
    current?: string | null;
    onRowClick?: (rowId: string) => void;
}

const RequestsTable: FC<IRequestsTableProps> = ({
    items,
    onRowClick,
    current,
}) => {
    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    {current ? null : (
                        <>
                            <TableCell>Method</TableCell>
                            <TableCell>Status</TableCell>
                        </>
                    )}
                </TableRow>
            </TableHead>
            <TableBody>
                {items.map((item) => (
                    <RequestsTableRow
                        item={item}
                        shrunk={!!current}
                        selected={item.request.id === current}
                        key={item.request.id}
                        onClick={(id) => onRowClick && onRowClick(id)}
                    />
                ))}
            </TableBody>
        </Table>
    );
};

export default RequestsTable;
