import { MonitorEvent } from 'http-inspector';
import { NextPage } from 'next';
import { useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MasterDetailsView } from '../components/MasterDetailsView';
import {
    IToolbarContextProps,
    ToolbarContext,
} from '../components/toolbar/ToolbarContext';
import { slice as columnsSlice } from '../redux/ducks/columns';
import { slice as filtersSlice } from '../redux/ducks/filters';
import { Lookups, slice as updatesSlice } from '../redux/ducks/updates';
import { globalSelectors, sliceSelectors } from '../redux/selectors';
import { State } from '../redux/store';
import { ColumnsSelection } from '../utils/Columns';
import { Filters } from '../utils/Filters';

interface Props {
    loggerEvents: MonitorEvent[];
    setCurrentEventID: typeof updatesSlice.actions.setCurrentEventID;
    setFilters: typeof filtersSlice.actions.setFilters;
    setColumnsSelection: typeof columnsSlice.actions.setColumnsSelection;
    filters: Filters;
    currentEvent: MonitorEvent | null;
    lookups: Lookups;
    columnsSelection: ColumnsSelection;
}

const IndexPage: NextPage<Props> = ({
    loggerEvents,
    setCurrentEventID,
    setFilters,
    currentEvent,
    lookups,
    filters,
    columnsSelection,
    setColumnsSelection,
}) => {
    const handleItemSelect = useCallback((id) => setCurrentEventID(id), []);
    const handleItemDeselect = useCallback(() => setCurrentEventID(null), []);
    const handleChangeFilters = useCallback(
        (filters) => setFilters(filters),
        []
    );
    const toolbarContextProps: IToolbarContextProps = {
        lookups,
        filters,
        columnsSelection,
        onChangeFilters: handleChangeFilters,
        onChangeColumns: setColumnsSelection,
    };

    return (
        <ToolbarContext.Provider value={toolbarContextProps}>
            <MasterDetailsView
                items={loggerEvents}
                currentItem={currentEvent}
                onItemSelect={handleItemSelect}
                onItemDeselect={handleItemDeselect}
                selectedColumns={columnsSelection}
            />
        </ToolbarContext.Provider>
    );
};

export default connect(
    (state: State) => ({
        loggerEvents    : globalSelectors.getFilteredLoggerEvents(state),
        currentEvent    : sliceSelectors.updates.getCurrentLoggerEvent(state),
        filters         : sliceSelectors.filters.getFilters(state),
        lookups         : sliceSelectors.updates.getLookups(state),
        columnsSelection: sliceSelectors.columns.getColumnsSelection(state),
    }),
    (dispatch) =>
        bindActionCreators(
            {
                setCurrentEventID  : updatesSlice.actions.setCurrentEventID,
                setFilters         : filtersSlice.actions.setFilters,
                setColumnsSelection: columnsSlice.actions.setColumnsSelection,
            },
            dispatch
        )
)(IndexPage);
