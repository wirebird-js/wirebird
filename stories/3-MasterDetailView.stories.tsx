import React, { useState } from 'react';
import { MasterDetailsView } from '../components/MasterDetailsView';
import loggerEvents from './data/loggerEvents';

export default {
    title: 'Master-Detail View',
};

export const main = () => {
    const [currentRowId, setCurrentRowId] = useState<string | null>(null);
    return (
        <MasterDetailsView
            items={loggerEvents}
            current={currentRowId}
            onItemSelect={(id) => setCurrentRowId(id)}
            onItemDeselect={() => setCurrentRowId(null)}
        />
    );
};
