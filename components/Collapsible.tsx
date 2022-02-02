import { alpha } from '@material-ui/core/styles/colorManipulator';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import React, { FC } from 'react';

const useStyles = makeStyles(
    () => {
        return {
            force: {},
            root : {
                '&$force': {
                    margin: 0,
                },
                boxShadow: 'none',
            },
            summary: {
                '$force &': {
                    minHeight: 33,
                },
                backgroundColor: alpha('rgb(0,0,0)', 0.07),
            },
            summaryContent: {
                '$force &': {
                    margin: 0,
                },
            },
        };
    },
    { name: 'Collapsible' }
);

export interface ICollapsibleProps {
    title?: string;
}

export const Collapsible: FC<ICollapsibleProps> = ({ title, children }) => {
    const classes = useStyles();
    return (
        <Accordion
            defaultExpanded
            className={classes.force}
            classes={{
                root: classes.root,
            }}
        >
            <AccordionSummary
                classes={{
                    root   : classes.summary,
                    content: classes.summaryContent,
                }}
            >
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
    );
};
