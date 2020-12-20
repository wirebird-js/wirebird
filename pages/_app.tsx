import React from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';
import store from '../redux/store';
import NoSSR from 'react-no-ssr';
import SplashScreen from '../components/SplashScreen';

class MyApp extends App {
    // Only uncomment this method if you have blocking data requirements for
    // every single page in your application. This disables the ability to
    // perform automatic static optimization, causing every page in your app to
    // be server-side rendered.
    //
    // static async getInitialProps(appContext) {
    //   // calls page's `getInitialProps` and fills `appProps.pageProps`
    //   const appProps = await App.getInitialProps(appContext);
    //
    //   return { ...appProps }
    // }

    render(): JSX.Element {
        const { Component, pageProps } = this.props;
        return (
            <NoSSR onSSR={<SplashScreen />}>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </NoSSR>
        );
    }
}

export default MyApp;
