import { Component, useCallback, useState } from 'react';
import { NextPage } from 'next';
import { MasterDetailsView } from '../components/MasterDetailsView';
import { connect } from 'react-redux';
import { getLoggerEvents } from '../redux/ducks/updates';
import { LoggerEvent } from 'http-inspector';
import { State } from '../redux/reducers';

interface Props {
    loggerEvents: LoggerEvent[];
}

const IndexPage: NextPage<Props> = ({ loggerEvents }) => {
    const [currentRowId, setCurrentRowId] = useState<string | null>(null);
    const handleItemSelect = useCallback((id) => setCurrentRowId(id), []);
    const handleItemDeselect = useCallback(() => setCurrentRowId(null), []);

    return (
        <MasterDetailsView
            items={loggerEvents}
            current={currentRowId}
            onItemSelect={handleItemSelect}
            onItemDeselect={handleItemDeselect}
        />
    );
};

export default connect((state: State) => ({
    loggerEvents: getLoggerEvents(state),
}))(IndexPage);
