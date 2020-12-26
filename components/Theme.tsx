import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { FC, useMemo } from 'react';
import { useDarkTheme } from '../utils/useDarkTheme';

export const Theme: FC = ({ children }) => {
    const isDarkTheme = useDarkTheme();
    const theme = useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: isDarkTheme ? 'dark' : 'light',
                },
            }),
        [isDarkTheme]
    );

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
