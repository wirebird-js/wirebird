import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { FC } from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';

const DEBUG = false;

const useStyles = makeStyles(
    (theme) => {
        const toolbarHeight = theme.spacing(8);
        return {
            root: {
                height       : 'calc(100vh - 20px)',
                display      : 'flex',
                flexDirection: 'column',
            },
            head: {
                backgroundColor: DEBUG ? 'rgb(92.1%, 78.2%, 49.2%)' : undefined,
                minHeight      : toolbarHeight,
            },
            content: {
                position: 'relative',
                flexGrow: 1,
            },
            left: {
                backgroundColor: DEBUG ? 'rgb(49.2%, 92.1%, 67%)' : undefined,
                height         : '100%',
            },
            right: {
                backgroundColor: DEBUG ? 'rgb(90.6%, 49.2%, 92.1%)' : undefined,
                // overflow       : 'auto',
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

    return (
        <div className={classes.root}>
            <div className={classes.head}>{toolbar}</div>
            <div className={classes.content}>
                <SplitterLayout>
                    <div className={classes.left}>{left}</div>
                    {right && <div className={classes.right}>{right}</div>}
                </SplitterLayout>
            </div>
        </div>
    );
};
