import { action } from '@storybook/addon-actions';
import React, { useState } from 'react';
import RequestsTable from '../components/RequestsTable';
import loggerEvents from './data/loggerEvents';

export default {
    title: 'Requests Table',
};

export const main = () => (
    <RequestsTable
        items={loggerEvents}
        onRowClick={action('table row clicked')}
    />
);

export const expandable = () => {
    const [currentRowId, setCurrentRowId] = useState<string | null>(null);
    return (
        <RequestsTable
            items={loggerEvents}
            current={currentRowId}
            onRowClick={(id) => setCurrentRowId(id)}
        />
    );
};
