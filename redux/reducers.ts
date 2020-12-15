import { slice as updatesSlice } from './ducks/updates';
import { slice as filtersState } from './ducks/filters';

export default {
    updates: updatesSlice.reducer,
    filters: filtersState.reducer,
};
