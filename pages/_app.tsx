import React, { FC } from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';
import store from '../redux/store';
import NoSSR from 'react-no-ssr';
import SplashScreen from '../components/SplashScreen';
import { Theme } from '../components/Theme';
import { makeStyles } from '@material-ui/core';
import '../css/all.css';

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

class MyApp extends App {
    render(): JSX.Element {
        const { Component, pageProps } = this.props;
        return (
            <Theme>
                <Background>
                    <NoSSR onSSR={<SplashScreen />}>
                        <Provider store={store}>
                            <Component {...pageProps} />
                        </Provider>
                    </NoSSR>
                </Background>
            </Theme>
        );
    }
}

export default MyApp;
