import { MonitorEvent } from 'http-inspector';
import { NextPage } from 'next';
import { useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MasterDetailsView } from '../components/MasterDetailsView';
import { slice as filtersSlice } from '../redux/ducks/filters';
import { Lookups, slice as updatesSlice } from '../redux/ducks/updates';
import { sliceSelectors, globalSelectors } from '../redux/selectors';
import { State } from '../redux/store';
import { Filters } from '../utils/Filters';

interface Props {
    loggerEvents: MonitorEvent[];
    setCurrentEventID: typeof updatesSlice.actions.setCurrentEventID;
    setFilters: typeof filtersSlice.actions.setFilters;
    filters: Filters;
    currentEvent: MonitorEvent | null;
    lookups: Lookups;
}

const IndexPage: NextPage<Props> = ({
    loggerEvents,
    setCurrentEventID,
    setFilters,
    currentEvent,
    lookups,
    filters,
}) => {
    const handleItemSelect = useCallback((id) => setCurrentEventID(id), []);
    const handleItemDeselect = useCallback(() => setCurrentEventID(null), []);
    const handleChangeFilters = useCallback(
        (filters) => setFilters(filters),
        []
    );

    return (
        <MasterDetailsView
            items={loggerEvents}
            currentItem={currentEvent}
            onItemSelect={handleItemSelect}
            onItemDeselect={handleItemDeselect}
            lookups={lookups}
            filters={filters}
            onFiltersChange={handleChangeFilters}
        />
    );
};

export default connect(
    (state: State) => ({
        loggerEvents: globalSelectors.getFilteredLoggerEvents(state),
        currentEvent: sliceSelectors.updates.getCurrentLoggerEvent(state),
        filters     : sliceSelectors.filters.getFilters(state),
        lookups     : sliceSelectors.updates.getLookups(state),
    }),
    (dispatch) =>
        bindActionCreators(
            {
                setCurrentEventID: updatesSlice.actions.setCurrentEventID,
                setFilters       : filtersSlice.actions.setFilters,
            },
            dispatch
        )
)(IndexPage);
