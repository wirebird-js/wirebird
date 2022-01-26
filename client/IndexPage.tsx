import { MonitorEvent } from 'http-inspector';
import React, { FC, useCallback } from 'react';
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
    resetFilters: typeof filtersSlice.actions.resetFilters;
    setColumnsSelection: typeof columnsSlice.actions.setColumnsSelection;
    filters: Filters;
    isAnyFilterSelected: boolean;
    currentEvent: MonitorEvent | null;
    lookups: Lookups;
    smartSearchOptions: string[];
    columnsSelection: ColumnsSelection;
}

const IndexPage: FC<Props> = ({
    loggerEvents,
    setCurrentEventID,
    setFilters,
    currentEvent,
    lookups,
    smartSearchOptions,
    filters,
    isAnyFilterSelected,
    columnsSelection,
    setColumnsSelection,
    resetFilters,
}) => {
    const handleItemSelect = useCallback((id) => setCurrentEventID(id), []);
    const handleItemDeselect = useCallback(() => setCurrentEventID(null), []);
    const handleChangeFilters = useCallback(
        (filters) => setFilters(filters),
        []
    );
    const toolbarContextProps: IToolbarContextProps = {
        lookups,
        smartSearchOptions,
        filters,
        showResetFilters: isAnyFilterSelected,
        columnsSelection,
        onChangeFilters : handleChangeFilters,
        onChangeColumns : setColumnsSelection,
        onResetFilters  : resetFilters,
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
        loggerEvents       : globalSelectors.getFilteredLoggerEvents(state),
        currentEvent       : sliceSelectors.updates.getCurrentLoggerEvent(state),
        filters            : sliceSelectors.filters.getFilters(state),
        isAnyFilterSelected: sliceSelectors.filters.isAnyFilterSelected(state),
        lookups            : sliceSelectors.updates.getLookups(state),
        smartSearchOptions : sliceSelectors.updates.getSmartSearchOptions(state),
        columnsSelection   : sliceSelectors.columns.getColumnsSelection(state),
    }),
    (dispatch) =>
        bindActionCreators(
            {
                setCurrentEventID  : updatesSlice.actions.setCurrentEventID,
                setFilters         : filtersSlice.actions.setFilters,
                resetFilters       : filtersSlice.actions.resetFilters,
                setColumnsSelection: columnsSlice.actions.setColumnsSelection,
            },
            dispatch
        )
)(IndexPage);
