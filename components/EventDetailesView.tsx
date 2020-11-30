import {
    Button,
    Grid,
    IconButton,
    makeStyles,
    Tab,
    Tabs,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { MonitorEvent } from 'http-inspector';
import React, { FC, useCallback, useState } from 'react';
import { HeadersView } from './HeadersView';
import TabPanel from '@material-ui/lab/TabPanel';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';

const useStyles = makeStyles((theme) => ({
    tabs: {
        minHeight: 'auto',
    },
    tab: {
        minWidth: 'auto',
        minHeight: 35,
        paddingTop: 0,
        paddingBottom: 0,
    },
    tabPanel: {
        padding: 0,
    },
}));

export interface IEventDetailsViewProps {
    event: MonitorEvent;
    onClose?: () => void;
}

export const EventDetailsView: FC<IEventDetailsViewProps> = ({
    event,
    onClose,
}) => {
    const handleCloseClick = useCallback(() => onClose && onClose(), [onClose]);
    const classes = useStyles();
    const [currentTab, setCurrentTab] = useState<
        'headers' | 'request' | 'response'
    >('headers');
    const handleTabsChange = useCallback(
        (event, tabValue) => setCurrentTab(tabValue),
        []
    );

    return (
        <TabContext value={currentTab}>
            <div>
                <Grid container>
                    <Grid item>
                        <IconButton onClick={handleCloseClick} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <TabList
                            value={currentTab}
                            classes={{ root: classes.tabs }}
                            onChange={handleTabsChange}
                        >
                            <Tab
                                value="headers"
                                classes={{ root: classes.tab }}
                                label="Main"
                            ></Tab>
                            {/* <Tab
                                value="request"
                                classes={{ root: classes.tab }}
                                label="Request"
                            ></Tab>
                            <Tab
                                value="response"
                                classes={{ root: classes.tab }}
                                label="Response"
                            ></Tab> */}
                        </TabList>
                    </Grid>
                </Grid>
            </div>

            <TabPanel value="headers" className={classes.tabPanel}>
                <HeadersView event={event} />
            </TabPanel>
        </TabContext>
    );
};
