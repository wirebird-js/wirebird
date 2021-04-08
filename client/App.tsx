import React, { FC } from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import NoSSR from 'react-no-ssr';
import SplashScreen from '../components/SplashScreen';
import { Theme } from '../components/Theme';
import { makeStyles } from '@material-ui/core';
import IndexPage from './IndexPage';

const useStyles = makeStyles(
    (theme) => ({
        root: {
            backgroundColor: theme.palette.background.paper,
        },
    }),
    { name: 'Background' }
);

const Background: FC = ({ children }) => {
    const classes = useStyles();
    return <div className={classes.root}>{children}</div>;
};

const App: FC = () => (
    <Theme>
        <Background>
            <NoSSR onSSR={<SplashScreen />}>
                <Provider store={store}>
                    <IndexPage />
                </Provider>
            </NoSSR>
        </Background>
    </Theme>
);

export default App;
