import { LoggerEvent } from 'http-inspector';
import { NextPage } from 'next';
import { useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MasterDetailsView } from '../components/MasterDetailsView';
import { setCurrentEventID } from '../redux/ducks/updates';
import { getCurrentLoggerEvent, getLoggerEvents } from '../redux/selectors';
import { State } from '../redux/store';

interface Props {
    loggerEvents: LoggerEvent[];
    setCurrentEventID: typeof setCurrentEventID;
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
                setCurrentEventID: setCurrentEventID,
            },
            dispatch
        )
)(IndexPage);
