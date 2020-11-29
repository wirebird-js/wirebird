import { LoggerError, LoggerEvent } from 'http-inspector/lib/src/SharedTypes';
import React, { useState } from 'react';
import { MasterDetailsView } from '../components/MasterDetailsView';
import loggerEvents from './data/loggerEvents';

export default {
    title: 'Master-Detail View',
};

export const main = () => {
    const [currentRowId, setCurrentRowId] = useState<string | null>(null);
    const [current, setCurrent] = useState<LoggerEvent | null>(null);
    return (
        <MasterDetailsView
            items={loggerEvents}
            currentItem={current}
            onItemSelect={(id) =>
                setCurrent(
                    loggerEvents.find((e) => e.request.id === id) || null
                )
            }
            onItemDeselect={() => setCurrent(null)}
        />
    );
};
