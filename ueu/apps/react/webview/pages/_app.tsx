/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import React from 'react';
import { ChakraProvider, theme, CSSReset } from '@chakra-ui/react';

// Next assets
import { AppProps } from 'next/app';
import Head from 'next/head';
import { defineCustomElements } from '@picpay/design-system/loader';
import { Token } from 'libs/packages/sass-functions/src/lib/tokens';

// Global Styles
import './styles.scss';
import Fonts from '../assets/fonts/fonts';

defineCustomElements();

const customToken = {
    ...theme,

    ...Token.colors,
    ...Token.borderRadius,
    ...Token.borderWidth,
    fontSizes: Token.fontSize,
    space: Token.spacing,
    lineHeights: Token.lineHeight,
    fontWeights: Token.fontWeight,
    shadows: Token.boxShadow,
    fonts: {
        heading: 'Montserrat',
        body: 'Montserrat',
    },
};

function AppWrapper({ Component, pageProps }: AppProps): React.ReactNode {
    return (
        <>
            <Head>
                <title>PicPay - Webviews</title>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;800&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <div className="app">
                <main className="app-main">
                    <ChakraProvider theme={customToken}>
                        <CSSReset />
                        <Component {...pageProps} />
                    </ChakraProvider>
                </main>
            </div>
        </>
    );
}

export default AppWrapper;
