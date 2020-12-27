import React, { FC, useState } from 'react';
import { ColumnsSelect, ColumnsSelection } from '../components/ColumnsSelect';

export default {
    title: 'ColumnsSelect',
};

export const main: FC = () => {
    const [value, setValue] = useState<ColumnsSelection>({ name: true });
    return <ColumnsSelect value={value} onChange={setValue} />;
};
