import { parse } from 'url';
import { MonitorEvent } from 'wirebird-client';
import { Filters } from '../../utils/Filters';

const searchMatch = (event: MonitorEvent, search: string): boolean => {
    if (event.request.url.includes(search)) {
        return true;
    }
    return false;
};

const filterFns: {
    [FName in keyof Required<Filters>]: (
        filterValue: Filters[FName],
        event: MonitorEvent
    ) => boolean;
} = {
    pid: (pid, event) => {
        return pid === undefined || event.processData.pid === pid;
    },
    domain: (domain, event) => {
        return domain === undefined || parse(event.request.url).host === domain;
    },
    search: (search, event) => {
        return search === undefined || searchMatch(event, search);
    },
    method: (method, event) => {
        return (
            method === undefined ||
            event.request.method.toUpperCase() === method
        );
    },
};

export const getFilteredLoggerEvents = (
    filterValues: Filters,
    events: MonitorEvent[]
): MonitorEvent[] =>
    events.filter((e) => {
        for (const filterProp of Object.keys(filterFns)) {
            const tsFilterProp = filterProp as keyof typeof filterFns;
            const tsValue =
                filterValues[filterProp as keyof typeof filterValues];
            if (
                !(filterFns[tsFilterProp] as (
                    f: typeof tsValue,
                    e: MonitorEvent
                ) => boolean)(tsValue, e)
            ) {
                return false;
            }
        }
        return true;
    });
