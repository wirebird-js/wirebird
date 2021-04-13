import React, { FC, useState } from 'react';
import { ViewMode } from '../components/content-view/viewModes';
import { ViewModeSelect } from '../components/content-view/ViewModeSelect';

export default {
    title: 'ViewModeSelect',
};

export const main: FC = () => {
    const [value, setValue] = useState<ViewMode>('json');
    return <ViewModeSelect value={value} onChange={setValue} />;
};
