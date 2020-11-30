import { Grid, MenuItem, Select, TextField } from '@material-ui/core';
import { FC, useState } from 'react';
import { ObjectInspector } from 'react-inspector';

const viewModes = {
    plain: 'Plain Text',
    image: 'Image',
    json: 'JSON',
};
type ViewMode = keyof typeof viewModes;

const bufferToDataURL = (mimeType: string, buffer: Buffer): string => {
    return `data:${mimeType};base64,${buffer.toString('base64')}`;
};

const tryParseJSON = (buf: Buffer): any => {
    const str = buf.toString('utf8');
    try {
        return JSON.parse(str);
    } catch (e) {
        return str;
    }
};

export interface IContentViewProps {
    contentType: string | null;
    data: Buffer;
}

export const ContentView: FC<IContentViewProps> = ({ contentType, data }) => {
    const [viewMode, setViewMode] = useState<ViewMode>('plain');

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
            <Grid item xs={12}>
                {viewMode === 'plain' && <pre>{data.toString('utf8')}</pre>}
                {viewMode === 'json' && (
                    <ObjectInspector data={tryParseJSON(data)} />
                )}
                {viewMode === 'image' && contentType && (
                    <img src={bufferToDataURL(contentType, data)} />
                )}
            </Grid>
        </Grid>
    );
};
