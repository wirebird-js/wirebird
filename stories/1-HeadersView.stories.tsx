import React, { FC } from 'react';
import { HeadersView } from '../components/HeadersView';
import loggerEvents from './data/loggerEvents';

export default {
    title: 'Headers View',
};

export const main: FC = () => <HeadersView event={loggerEvents[0]} />;
export const erraneous: FC = () => <HeadersView event={loggerEvents[2]} />;
