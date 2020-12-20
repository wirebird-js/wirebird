import React, { FC } from 'react';
import { EventDetailsView } from '../components/EventDetailesView';
import loggerEvents from './data/loggerEvents';

export default {
    title: 'Event Details View',
};

export const main: FC = () => {
    return <EventDetailsView event={loggerEvents[0]} />;
};
