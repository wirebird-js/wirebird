import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import React, { FC, useMemo } from 'react';
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
