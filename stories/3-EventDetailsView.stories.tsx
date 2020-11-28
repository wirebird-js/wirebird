import React, { useState } from 'react';
import { EventDetailsView } from '../components/EventDetailesView';
import { MasterDetailsView } from '../components/MasterDetailsView';
import loggerEvents from './data/loggerEvents';

export default {
    title: 'Event Details View',
};

export const main = () => {
    return <EventDetailsView event={loggerEvents[0]} />;
};
