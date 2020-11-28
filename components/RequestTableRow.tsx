import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core';
import { LoggerEvent } from 'http-inspector';
import React, { FC, SFC } from 'react';

interface IRequestsTableRowProps {
    item: LoggerEvent;
    onClick?: (rowId: string) => void;
    shrunk?: boolean;
    selected?: boolean;
}

const useStyles = makeStyles((theme) => ({
    selected: {
        backgroundColor: theme.palette.primary.main,
        '& td': {
            color: theme.palette.getContrastText(theme.palette.primary.main),
        },
    },
}));

const RequestsTableRow: FC<IRequestsTableRowProps> = ({
    item,
    onClick,
    shrunk,
    selected,
}) => {
    const classes = useStyles();
    return (
        <TableRow
            onClick={() => onClick && onClick(item.request.id)}
            className={selected ? classes.selected : ''}
        >
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
};

export default RequestsTableRow;
