import React, { createContext, FC, useMemo } from 'react';
import { Lookups } from '../redux/ducks/updates';
import { emptyObject } from '../utils/emptyObject';
import { Filters, initialFilters } from '../utils/Filters';
import { LookupFilterField } from './filter-controls/LookupFilterField';
import { TextFilterField } from './filter-controls/TextFilterField';



const createFieldUpdater = (
    fieldName: keyof Filters,
    value: IToolbarProps['filters'],
    onChange: IToolbarProps['onChange']
) => (fieldValue: string | number | undefined) => {
    if (fieldValue === '') {
        fieldValue = undefined;
    }
    onChange?.({ ...value, [fieldName]: fieldValue });
};

export interface IToolbarProps {
    lookups?: Partial<Lookups>;
    filters?: Filters;
    onChange?: (value: Filters) => void;
}
export const Toolbar: FC<IToolbarProps> = React.memo(
    ({
        lookups = emptyObject as Partial<Lookups>,
        filters: value = initialFilters,
        onChange,
    }) => {
        const handlePIDChange = useMemo(
            () => createFieldUpdater('pid', value, onChange),
            [onChange, value]
        );
        const handleSearchChange = useMemo(
            () => createFieldUpdater('search', value, onChange),
            [onChange, value]
        );
        const handleDomainChange = useMemo(
            () => createFieldUpdater('domain', value, onChange),
            [onChange, value]
        );
        const handleMethodChange = useMemo(
            () => createFieldUpdater('method', value, onChange),
            [onChange, value]
        );
        return (
            <div>
                <LookupFilterField
                    label="pid"
                    lookup={lookups.pid ?? emptyObject}
                    onChange={handlePIDChange}
                    value={value.pid}
                />
                <LookupFilterField
                    label="domain"
                    lookup={lookups.domain ?? emptyObject}
                    onChange={handleDomainChange}
                    value={value.domain}
                />
                <LookupFilterField
                    label="method"
                    lookup={lookups.method ?? emptyObject}
                    onChange={handleMethodChange}
                    value={value.method}
                />
                <TextFilterField
                    label="search"
                    onChange={handleSearchChange}
                    value={value.search}
                />
            </div>
        );
    }
);
