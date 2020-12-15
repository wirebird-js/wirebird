import { MonitorEvent } from 'http-inspector';
import { NextPage } from 'next';
import { useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MasterDetailsView } from '../components/MasterDetailsView';
import { slice as filtersSlice } from '../redux/ducks/filters';
import { slice as updatesSlice } from '../redux/ducks/updates';
import { selectors } from '../redux/selectors';
import { State } from '../redux/store';
import { Filters } from '../utils/Filters';

interface Props {
    loggerEvents: MonitorEvent[];
    setCurrentEventID: typeof updatesSlice.actions.setCurrentEventID;
    setFilters: typeof filtersSlice.actions.setFilters;
    currentEvent: MonitorEvent | null;
    pidsList: string[];
}

const IndexPage: NextPage<Props> = ({
    loggerEvents,
    setCurrentEventID,
    setFilters,
    currentEvent,
    pidsList,
}) => {
    const handleItemSelect = useCallback(id => setCurrentEventID(id), []);
    const handleItemDeselect = useCallback(() => setCurrentEventID(null), []);
    const handleChangeFilters = useCallback(filters => setFilters(filters), []);

    return (
        <MasterDetailsView
            items={loggerEvents}
            currentItem={currentEvent}
            onItemSelect={handleItemSelect}
            onItemDeselect={handleItemDeselect}
            pidsList={pidsList}
            onFiltersChange={handleChangeFilters}
        />
    );
};

export default connect(
    (state: State) => ({
        loggerEvents: selectors.updates.getLoggerEvents(state),
        currentEvent: selectors.updates.getCurrentLoggerEvent(state),
        pidsList: selectors.updates.getAllPIDs(state),
        filters: selectors.filters.getFilters(state),
    }),
    dispatch =>
        bindActionCreators(
            {
                setCurrentEventID: updatesSlice.actions.setCurrentEventID,
                setFilters: filtersSlice.actions.setFilters,
            },
            dispatch
        )
)(IndexPage);
