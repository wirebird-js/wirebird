import { Component, useCallback, useState } from 'react';
import { NextPage } from 'next';
import { MasterDetailsView } from '../components/MasterDetailsView';
import { connect } from 'react-redux';
import { getCurrentLoggerEvent, getLoggerEvents } from '../redux/ducks/updates';
import { LoggerEvent } from 'http-inspector';
import { State } from '../redux/reducers';
import { bindActionCreators } from 'redux';
import { setCurrentEventIDAction } from '../redux/ducks/updates';

interface Props {
    loggerEvents: LoggerEvent[];
    setCurrentEventID: typeof setCurrentEventIDAction;
    currentEvent: LoggerEvent | null;
}

const IndexPage: NextPage<Props> = ({
    loggerEvents,
    setCurrentEventID,
    currentEvent,
}) => {
    const handleItemSelect = useCallback((id) => setCurrentEventID(id), []);
    const handleItemDeselect = useCallback(() => setCurrentEventID(null), []);

    return (
        <MasterDetailsView
            items={loggerEvents}
            currentItem={currentEvent}
            onItemSelect={handleItemSelect}
            onItemDeselect={handleItemDeselect}
        />
    );
};

export default connect(
    (state: State) => ({
        loggerEvents: getLoggerEvents(state).items,
        currentEvent: getCurrentLoggerEvent(state),
    }),
    (dispatch) =>
        bindActionCreators(
            {
                setCurrentEventID: setCurrentEventIDAction,
            },
            dispatch
        )
)(IndexPage);
