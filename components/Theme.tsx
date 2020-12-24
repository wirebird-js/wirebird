import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { FC } from 'react';

const theme = createMuiTheme({
    // palette: { type: 'dark' },
});

export const Theme: FC = ({ children }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
