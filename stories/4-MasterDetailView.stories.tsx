import { MonitorEvent } from 'http-inspector/lib/src/SharedTypes';
import React, { FC, useState } from 'react';
import { MasterDetailsView } from '../components/MasterDetailsView';
import { ColumnsSelection } from '../utils/Columns';
import loggerEvents from './data/loggerEvents';

export default {
    title: 'Master-Detail View',
};

const selectedColumns: ColumnsSelection = {
    name          : true,
    requestMethod : true,
    requestURL    : true,
    responseStatus: true,
};

export const main: FC = () => {
    const [current, setCurrent] = useState<MonitorEvent | null>(null);
    return (
        <MasterDetailsView
            items={loggerEvents}
            currentItem={current}
            onItemSelect={(id) =>
                setCurrent(
                    loggerEvents.find((e) => e.request.id === id) ?? null
                )
            }
            onItemDeselect={() => setCurrent(null)}
            selectedColumns={selectedColumns}
        />
    );
};
