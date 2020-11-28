import React from 'react';
import { HeadersView } from '../components/HeadersView';
import loggerEvents from './data/loggerEvents';

export default {
    title: 'Headers View',
};

export const main = () => <HeadersView event={loggerEvents[0]} />;
export const erraneous = () => <HeadersView event={loggerEvents[2]} />;
