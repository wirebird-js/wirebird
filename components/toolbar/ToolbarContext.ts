import { createContext, useContext } from 'react';
import { Filters } from 'react-data-grid';
import { Lookups } from '../../redux/ducks/updates';
import { emptyObject } from '../../utils/emptyObject';

export interface IToolbarContextProps {
    lookups?: Partial<Lookups>;
    filters?: Filters;
    onChange?: (value: Filters) => void;
}
export const ToolbarContext = createContext<IToolbarContextProps>(emptyObject);

export const useToolbarContext = (): IToolbarContextProps =>
    useContext(ToolbarContext);
