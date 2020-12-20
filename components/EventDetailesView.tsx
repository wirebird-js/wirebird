import { Grid, IconButton, makeStyles, Tab } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { MonitorEvent } from 'http-inspector';
import React, { FC, useCallback, useState } from 'react';
import { Headers } from '../utils/Headers';
import { ContentView } from './ContentView';
import { HeadersView } from './HeadersView';

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
    header: {
        position: 'sticky',
        top: 0,
        zIndex: 2,
        backgroundColor: theme.palette.background.default,
    },
}));

type TabID = 'headers' | 'request' | 'response';

const createTabs = (
    event: MonitorEvent,
    classes: ReturnType<typeof useStyles>,
    currentTab: TabID
) => {
    const tabDefs = {
        headers: {
            condition: true,
            tab: (
                <Tab
                    key="headers"
                    value="headers"
                    classes={{ root: classes.tab }}
                    label="Main"
                ></Tab>
            ),
        },
        request: {
            condition: !!event.request?.body,
            tab: (
                <Tab
                    key="request"
                    value="request"
                    classes={{ root: classes.tab }}
                    label="Request"
                ></Tab>
            ),
        },
        response: {
            condition: !!event.response?.body,
            tab: (
                <Tab
                    key="response"
                    value="response"
                    classes={{ root: classes.tab }}
                    label="Response"
                ></Tab>
            ),
        },
    };

    const tabs = [];

    for (const [tabID, tabDef] of Object.entries(tabDefs)) {
        if (tabDef.condition) {
            tabs.push(tabDef.tab);
        } else if (currentTab === tabID) {
            currentTab = 'headers';
        }
    }

    return { tabs, currentTab };
};

export interface IEventDetailsViewProps {
    event: MonitorEvent;
    onClose?: () => void;
}

export const EventDetailsView: FC<IEventDetailsViewProps> = ({
    event,
    onClose,
}) => {
    const handleCloseClick = useCallback(() => onClose?.(), [onClose]);
    const classes = useStyles();
    const [currentTab, setCurrentTab] = useState<TabID>('headers');
    const handleTabsChange = useCallback(
        (event, tabValue) => setCurrentTab(tabValue),
        []
    );
    const normalizedRequestHeaders = new Headers(event.request.headers);
    const normalizedResponseHeaders = event.response
        ? new Headers(event.response.headers)
        : null;
    const responseContentType = normalizedResponseHeaders
        ? normalizedResponseHeaders.get('content-type')
        : null;
    const requestContentType = normalizedRequestHeaders
        ? normalizedRequestHeaders.get('content-type')
        : null;

    const tabs = createTabs(event, classes, currentTab);

    return (
        <TabContext value={tabs.currentTab}>
            <div className={classes.header}>
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
                            {tabs.tabs}
                        </TabList>
                    </Grid>
                </Grid>
            </div>

            <TabPanel value="headers" className={classes.tabPanel}>
                <HeadersView event={event} />
            </TabPanel>
            <TabPanel value="request" className={classes.tabPanel}>
                {event.request?.body && (
                    <ContentView
                        contentType={requestContentType}
                        data={event.request.body}
                    />
                )}
            </TabPanel>
            <TabPanel value="response" className={classes.tabPanel}>
                {event.response?.body && (
                    <ContentView
                        contentType={responseContentType}
                        data={event.response.body}
                    />
                )}
            </TabPanel>
        </TabContext>
    );
};
