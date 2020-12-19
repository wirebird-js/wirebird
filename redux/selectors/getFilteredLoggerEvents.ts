import { MonitorEvent } from 'http-inspector';
import { Filters } from '../../utils/Filters';

const filterFns: {
    [FName in keyof Filters]: (
        filter: Filters[FName],
        event: MonitorEvent
    ) => boolean;
} = {
    pid: (pid, event) => {
        return pid === undefined || event.processData.pid === pid;
    },
};

export const getFilteredLoggerEvents = (
    filters: Filters,
    events: MonitorEvent[]
): MonitorEvent[] =>
    events.filter(e => {
        for (const [filterProp, filterFn] of Object.entries(filterFns)) {
            if (!filterFn) {
                continue;
            }
            if (!filterFn(filters[filterProp as keyof Filters], e)) {
                return false;
            }
        }
        return true;
    });
