import React, { FC, useState } from 'react';
import { Toolbar } from '../components/Toolbar';
import { Filters } from '../utils/Filters';

export default {
    title: 'Toolbar View',
};

export const main: FC = () => {
    const [filters, setFilters] = useState<Filters>({
        pid: 2,
    });
    return (
        <Toolbar
            lookups={{
                pid   : { '1': 1, '2': 2, '3': 3 },
                domain: { 'foo.com': 'foo.com' },
                method: { GET: 'GET', POST: 'POST' },
            }}
            filters={filters}
            onChange={setFilters}
        />
    );
};
