import { slice as updatesSlice } from './ducks/updates';
import { slice as filtersState } from './ducks/filters';
import { slice as columnsState } from './ducks/columns';

export default {
    updates: updatesSlice.reducer,
    filters: filtersState.reducer,
    columns: columnsState.reducer,
};
