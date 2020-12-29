import React, { FC, useState } from 'react';
import { ColumnsSelect } from '../components/ColumnsSelect';
import { ColumnsSelection } from '../utils/Columns';

export default {
    title: 'ColumnsSelect',
};

export const main: FC = () => {
    const [value, setValue] = useState<ColumnsSelection>({ name: true });
    return <ColumnsSelect value={value} onChange={setValue} />;
};
