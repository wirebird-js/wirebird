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
    pidsList: string[];
}

const IndexPage: NextPage<Props> = ({
    loggerEvents,
    setCurrentEventID,
    currentEvent,
    pidsList
}) => {
    const handleItemSelect = useCallback(id => setCurrentEventID(id), []);
    const handleItemDeselect = useCallback(() => setCurrentEventID(null), []);

    return (
        <MasterDetailsView
            items={loggerEvents}
            currentItem={currentEvent}
            onItemSelect={handleItemSelect}
            onItemDeselect={handleItemDeselect}
            pidsList={pidsList}
        />
    );
};

export default connect(
    (state: State) => ({
        loggerEvents: selectors.updates.getLoggerEvents(state),
        currentEvent: selectors.updates.getCurrentLoggerEvent(state),
        pidsList: selectors.updates.getAllPIDs(state)
    }),
    dispatch =>
        bindActionCreators(
            {
                setCurrentEventID: setCurrentEventID
            },
            dispatch
        )
)(IndexPage);
