import { useMediaQuery } from '@material-ui/core';

export const useDarkTheme = (): boolean =>
    useMediaQuery('(prefers-color-scheme: dark)');
