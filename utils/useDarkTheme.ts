import useMediaQuery from '@material-ui/core/useMediaQuery';

export const useDarkTheme = (): boolean =>
    useMediaQuery('(prefers-color-scheme: dark)');
