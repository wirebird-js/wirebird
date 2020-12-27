import React, { FC, useMemo } from 'react';
import { Lookups } from '../redux/ducks/updates';
import { Filters, initialFilters } from '../utils/Filters';
import { LookupFilterField } from './filter-controls/LookupFilterField';
import { TextFilterField } from './filter-controls/TextFilterField';

const createFieldUpdater = (
    fieldName: keyof Filters,
    value: IToolbarFiltersProps['value'],
    onChange: IToolbarFiltersProps['onChange']
) => (fieldValue: string | number | undefined) => {
    if (fieldValue === '') {
        fieldValue = undefined;
    }
    onChange?.({ ...value, [fieldName]: fieldValue });
};

export interface IToolbarFiltersProps {
    lookups: Lookups;
    value?: Filters;
    onChange?: (value: Filters) => void;
}
export const ToolbarFilters: FC<IToolbarFiltersProps> = React.memo(
    ({ lookups, value = initialFilters, onChange }) => {
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
                    lookup={lookups.pid}
                    onChange={handlePIDChange}
                    value={value.pid}
                />
                <LookupFilterField
                    label="domain"
                    lookup={lookups.domain}
                    onChange={handleDomainChange}
                    value={value.domain}
                />
                <LookupFilterField
                    label="method"
                    lookup={lookups.method}
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
