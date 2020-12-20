import { MonitorEvent } from 'http-inspector/lib/src/SharedTypes';
import React, { FC, useState } from 'react';
import { MasterDetailsView } from '../components/MasterDetailsView';
import loggerEvents from './data/loggerEvents';

export default {
    title: 'Master-Detail View',
};

export const main: FC = () => {
    const [current, setCurrent] = useState<MonitorEvent | null>(null);
    return (
        <MasterDetailsView
            lookups={{ pid: {} }}
            items={loggerEvents}
            currentItem={current}
            onItemSelect={(id) =>
                setCurrent(
                    loggerEvents.find((e) => e.request.id === id) ?? null
                )
            }
            onItemDeselect={() => setCurrent(null)}
        />
    );
};
