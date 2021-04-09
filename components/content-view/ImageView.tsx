import React from 'react';
import Grid from '@material-ui/core/Grid';
import { FC } from 'react';
import { bufferToDataURL } from '../../utils/bufferToDataURL';

export interface IImageViewProps {
    contentType: string;
    data: Buffer;
}

export const ImageView: FC<IImageViewProps> = ({ contentType, data }) => {
    return (
        <Grid container alignItems="center" justify="center">
            <Grid item>
                <img src={bufferToDataURL(contentType, data)} />
            </Grid>
        </Grid>
    );
};
