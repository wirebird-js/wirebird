import { Button } from '@material-ui/core';
import { LoggerEvent } from 'http-inspector';
import React, { FC, useCallback } from 'react';
import { HeadersView } from './HeadersView';

export interface IEventDetailsViewProps {
    event: LoggerEvent;
    onClose?: () => void;
}

export const EventDetailsView: FC<IEventDetailsViewProps> = ({
    event,
    onClose,
}) => {
    const handleCloseClick = useCallback(() => onClose && onClose(), [onClose]);

    return (
        <div>
            <div>
                <Button onClick={handleCloseClick}>Close</Button>
            </div>
            <HeadersView event={event} />
        </div>
    );
};
