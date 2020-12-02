import { MonitorEvent } from 'http-inspector';
import { NextPage } from 'next';
import { useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MasterDetailsView } from '../components/MasterDetailsView';
import { setCurrentEventID } from '../redux/ducks/updates';
import { selectors } from '../redux/selectors';
import { State } from '../redux/store';

interface Props {
    loggerEvents: MonitorEvent[];
    setCurrentEventID: typeof setCurrentEventID;
    currentEvent: MonitorEvent | null;
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
        loggerEvents: selectors.updates.getLoggerEvents(state).items,
        currentEvent: selectors.updates.getCurrentLoggerEvent(state),
    }),
    (dispatch) =>
        bindActionCreators(
            {
                setCurrentEventID: setCurrentEventID,
            },
            dispatch
        )
)(IndexPage);
