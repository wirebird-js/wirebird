import { reducer as updatesReducer, UpdatesState } from './ducks/updates';

export default {
    updates: updatesReducer,
};

export interface State {
    updates: UpdatesState;
}
