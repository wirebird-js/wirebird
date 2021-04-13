import { action } from '@storybook/addon-actions';
import React, { FC, useState } from 'react';
import RequestsTable from '../components/RequestsTable';
import { ColumnsSelection } from '../utils/Columns';
import loggerEvents from './data/loggerEvents';

export default {
    title: 'Requests Table',
};
const selectedColumns: ColumnsSelection = {
    name          : true,
    requestMethod : true,
    requestURL    : true,
    responseStatus: true,
};

export const main: FC = () => (
    <RequestsTable
        items={loggerEvents}
        onRowClick={action('table row clicked')}
        selectedColumns={selectedColumns}
    />
);

export const selectable: FC = () => {
    const [currentRowId, setCurrentRowId] = useState<string | null>(null);
    return (
        <RequestsTable
            items={loggerEvents}
            current={currentRowId}
            onRowClick={(id) => setCurrentRowId(id)}
            selectedColumns={selectedColumns}
        />
    );
};
