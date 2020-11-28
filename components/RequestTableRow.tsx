import { makeStyles } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import classnames from 'classnames';
import { LoggerEvent } from 'http-inspector';
import React, { FC } from 'react';

interface IRequestsTableRowProps {
    item: LoggerEvent;
    onClick?: (rowId: string) => void;
    shrunk?: boolean;
    selected?: boolean;
}

const useStyles = makeStyles((theme) => ({
    root: {
        cursor: 'pointer',
    },

    selected: {
        backgroundColor: theme.palette.primary.main,
        '& td': {
            color: theme.palette.getContrastText(theme.palette.primary.main),
        },
    },

    erraneous: {
        '& td': {
            color: theme.palette.error.main,
        },
        '&$selected': {
            backgroundColor: theme.palette.error.main,
            '& td': {
                color: theme.palette.getContrastText(theme.palette.error.main),
            },
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

    const rowClasses = classnames(
        {
            [classes.selected]: selected,
            [classes.erraneous]: !!item.error,
        },
        classes.root
    );
    return (
        <TableRow
            onClick={() => onClick && onClick(item.request.id)}
            className={rowClasses}
        >
            <TableCell>{item.request.url}</TableCell>
            {shrunk ? null : (
                <>
                    <TableCell>{item.request.method}</TableCell>
                    <TableCell>
                        {item.response ? item.response.status : ''}
                        {item.error ? `(failed) ${item.error.code}` : ''}
                    </TableCell>
                </>
            )}
        </TableRow>
    );
};

export default RequestsTableRow;
