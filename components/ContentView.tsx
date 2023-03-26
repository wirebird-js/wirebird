import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { FC, useEffect, useState } from 'react';
import { detectType } from './content-view/detectType';
import { FormView } from './content-view/FormView';
import { ImageView } from './content-view/ImageView';
import { JSONView } from './content-view/JSONView';
import { TextView } from './content-view/TextView';
import { ViewMode } from './content-view/viewModes';
import { ViewModeSelect } from './content-view/ViewModeSelect';
import { XMLView } from './content-view/XMLView';

const useStyles = makeStyles((theme) => ({
    contentArea: {
        padding: theme.spacing(2),
    },
}));

export interface IContentViewProps {
    contentType: string | null;
    data: Buffer;
}

export const ContentView: FC<IContentViewProps> = ({ contentType, data }) => {
    const detected = detectType(contentType);
    const [viewMode, setViewMode] = useState<ViewMode>(detected.viewType);
    useEffect(() => {
        setViewMode(detected.viewType);
    }, [contentType]);
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container justify="center">
                    <ViewModeSelect value={viewMode} onChange={setViewMode} />
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.contentArea}>
                {viewMode === 'plain' && <TextView data={data} />}
                {viewMode === 'json' && <JSONView data={data} />}
                {viewMode === 'image' && contentType && (
                    <ImageView contentType={contentType} data={data} />
                )}
                {viewMode === 'xml' && contentType && (
                    <XMLView contentType={detected.pureType} data={data} />
                )}
                {viewMode === 'form' && contentType && <FormView data={data} />}
            </Grid>
        </Grid>
    );
};
