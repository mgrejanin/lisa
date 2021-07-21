import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

import { defineCustomElements } from '@picpay/design-system/loader';

defineCustomElements();

function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Welcome to website!</title>
            </Head>
            <div className="app">
                <main>
                    <Component {...pageProps} />
                </main>
            </div>
        </>
    );
}

export default CustomApp;
