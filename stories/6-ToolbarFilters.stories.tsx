import React, { useState } from 'react';
import { ToolbarFilters } from '../components/ToolbarFilters';
import { Filters } from '../utils/Filters';

export default {
    title: 'Toolbar Filters View',
};

export const main = () => {
    const [filters, setFilters] = useState<Filters>({
        pid: 2,
    });
    return (
        <ToolbarFilters
            lookups={{ pid: { '1': 1, '2': 2, '3': 3 } }}
            value={filters}
            onChange={setFilters}
        />
    );
};
