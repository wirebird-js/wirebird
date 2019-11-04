import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { LoggerEvent } from 'http-inspector';
import React, { SFC } from 'react';

interface IRequestsTableRowProps {
    item: LoggerEvent;
    onClick?: (rowId: string) => void;
    shrunk?: boolean;
}

const RequestsTableRow: SFC<IRequestsTableRowProps> = ({
    item,
    onClick,
    shrunk
}) => (
    <TableRow onClick={() => onClick && onClick(item.request.id)}>
        <TableCell>{item.request.url}</TableCell>
        {shrunk ? null : (
            <>
                <TableCell>{item.request.method}</TableCell>
                <TableCell>
                    {item.response ? item.response.status : ''}
                </TableCell>
            </>
        )}
    </TableRow>
);

export default RequestsTableRow;
