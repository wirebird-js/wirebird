import { LoggerEvent, LoggerHeaders } from 'http-inspector/lib/src/SharedTypes';
import React, { FC } from 'react';
import { Collapsible } from './Collapsible';
import { KeyValue, KeyValueView } from './KeyValueView';

const headersToKeyValue = (headers: LoggerHeaders): KeyValue[] =>
    Object.entries(headers).map(([key, value]) => ({
        key,
        value,
    }));

const getGeneralInfo = (event: LoggerEvent): KeyValue[] => {
    const info: KeyValue[] = [];
    info.push({
        key: 'URL',
        value: event.request.url,
    });
    info.push({
        key: 'Request Method',
        value: event.request.method,
    });
    if (event.response) {
        info.push({
            key: 'Status Code',
            value: `${event.response.status}`,
        });
    }
    return info;
};

export interface IHeadersViewProps {
    event: LoggerEvent;
}

export const HeadersView: FC<IHeadersViewProps> = ({
    event,
    event: { error, request, response },
}) => {
    return (
        <div>
            <Collapsible title="General:">
                <KeyValueView items={getGeneralInfo(event)}></KeyValueView>
            </Collapsible>
            <Collapsible title="Request headers:">
                <KeyValueView
                    items={headersToKeyValue(request.headers)}
                ></KeyValueView>
            </Collapsible>
            {response && (
                <Collapsible title="Response headers:">
                    <KeyValueView
                        items={headersToKeyValue(response.headers)}
                    ></KeyValueView>
                </Collapsible>
            )}
            {error && (
                <Collapsible title="Error:">
                    <KeyValueView
                        items={[
                            { key: 'Code', value: error.code },
                            { key: 'Message', value: error.message },
                            { key: 'Stack', value: error.stack },
                        ]}
                    ></KeyValueView>
                </Collapsible>
            )}
        </div>
    );
};
