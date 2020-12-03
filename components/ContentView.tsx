import { Grid, makeStyles, MenuItem, TextField } from '@material-ui/core';
import { FC, useEffect, useState } from 'react';
import { detectType } from './content-view/detectType';
import { ImageView } from './content-view/ImageView';
import { JSONView } from './content-view/JSONView';
import { TextView } from './content-view/TextView';

const useStyles = makeStyles((theme) => ({
    contentArea: {
        padding: theme.spacing(2),
    },
}));

const viewModes = {
    plain: 'Plain Text',
    image: 'Image',
    json: 'JSON',
};
type ViewMode = keyof typeof viewModes;

export interface IContentViewProps {
    contentType: string | null;
    data: Buffer;
}

export const ContentView: FC<IContentViewProps> = ({ contentType, data }) => {
    const [viewMode, setViewMode] = useState<ViewMode>(detectType(contentType));
    useEffect(() => {
        setViewMode(detectType(contentType));
    }, [contentType]);
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container justify="flex-end">
                    <Grid item xs={6} lg={2}>
                        <TextField
                            fullWidth
                            select
                            value={viewMode}
                            label="View as"
                            onChange={(e) => {
                                setViewMode(e.target.value as ViewMode);
                            }}
                        >
                            {Object.entries(viewModes).map(([key, label]) => (
                                <MenuItem key={key} value={key}>
                                    {label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.contentArea}>
                {viewMode === 'plain' && <TextView data={data} />}
                {viewMode === 'json' && <JSONView data={data} />}
                {viewMode === 'image' && contentType && (
                    <ImageView contentType={contentType} data={data} />
                )}
            </Grid>
        </Grid>
    );
};