import { makeStyles } from '@material-ui/core';
import React, { FC } from 'react';
import classnames from 'classnames';

const DEBUG = false;

const useStyles = makeStyles(
    theme => {
        const toolbarHeight = theme.spacing(8);
        return {
            isLeftWide: {},

            root: {
                height: 'calc(100vh - 20px)',
                display: 'flex',
                flexDirection: 'column',
            },
            head: {
                backgroundColor: DEBUG ? 'rgb(92.1%, 78.2%, 49.2%)' : 'none',
                minHeight: toolbarHeight,
            },
            content: {
                display: 'flex',
                flexDirection: 'row',
                overflowY: 'hidden',
                flexGrow: 1,
            },
            left: {
                backgroundColor: DEBUG ? 'rgb(49.2%, 92.1%, 67%)' : 'none',
                overflow: 'auto',
                maxWidth: '25%',
                width: '25%',
                '&$isLeftWide': {
                    maxWidth: '100%',
                    width: '100%',
                },
            },
            right: {
                backgroundColor: DEBUG ? 'rgb(90.6%, 49.2%, 92.1%)' : 'none',
                overflow: 'auto',
                maxWidth: '75%',
                width: '75%',
            },
        };
    },
    { name: 'MasterDetailsLayout' }
);

export interface IMasterDetailsLayoutProps {
    toolbar: React.ReactNode;
    left: React.ReactNode;
    right: React.ReactNode;
}

export const MasterDetailsLayout: FC<IMasterDetailsLayoutProps> = ({
    left,
    right,
    toolbar,
}) => {
    const classes = useStyles();
    const leftClasses = classnames(
        {
            [classes.isLeftWide]: !right,
        },
        classes.left
    );

    return (
        <div className={classes.root}>
            <div className={classes.head}>{toolbar}</div>
            <div className={classes.content}>
                <div className={leftClasses}>{left}</div>
                {right && <div className={classes.right}>{right}</div>}
            </div>
        </div>
    );
};
