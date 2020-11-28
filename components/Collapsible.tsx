import { makeStyles, Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import React, { FC } from 'react';

const useStyles = makeStyles((theme) => ({
    noMargins: {
        '&,&:last-child,&:first-child': {
            marginTop: 0,
            marginBottom: 0,
        },
    },
    summary: {
        marginTop: 0,
        marginBottom: 0,
    },
}));

export interface ICollapsibleProps {
    title?: string;
}

export const Collapsible: FC<ICollapsibleProps> = ({ title, children }) => {
    const classes = useStyles();
    return (
        <Accordion
            defaultExpanded
            classes={{
                root: classes.noMargins,
                expanded: classes.noMargins,
            }}
        >
            <AccordionSummary
                classes={{
                    expanded: classes.summary,
                    content: classes.summary,
                }}
            >
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
    );
};
