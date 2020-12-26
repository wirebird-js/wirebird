import { useMemo } from 'react';
import {
    chromeDark,
    chromeLight,
    InspectorThemeDefinition,
} from 'react-inspector';
import { useDarkTheme } from './useDarkTheme';

export const useReactInspectorTheme = (): InspectorThemeDefinition => {
    const isDarkTheme = useDarkTheme();
    return useMemo(() => {
        const theme = isDarkTheme ? chromeDark : chromeLight;
        return {
            ...theme,
            BASE_FONT_SIZE       : '14px',
            TREENODE_FONT_SIZE   : '14px',
            BASE_BACKGROUND_COLOR: 'inherit',
        };
    }, [isDarkTheme]);
};
