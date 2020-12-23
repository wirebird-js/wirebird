import React, { FC, useState } from 'react';
import { ToolbarFilters } from '../components/ToolbarFilters';
import { Filters } from '../utils/Filters';

export default {
    title: 'Toolbar Filters View',
};

export const main: FC = () => {
    const [filters, setFilters] = useState<Filters>({
        pid: 2,
    });
    return (
        <ToolbarFilters
            lookups={{
                pid: { '1': 1, '2': 2, '3': 3 },
                domain: { 'foo.com': 'foo.com' },
            }}
            value={filters}
            onChange={setFilters}
        />
    );
};
