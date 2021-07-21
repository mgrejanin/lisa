import React from 'react';
import { Grid, Text } from '@chakra-ui/react';
import Banner from './components/banner/banner.component';
import Calculator from './components/calculator/calculator.component';
import Description from './components/description/description';
import Footer from './components/footer/footer';

import './cashback-calculator.module.scss';

export function CashbackCalculator() {
    return (
        <Grid templateColumns="repeat(1, auto)" bg="#eef0e8" minH="100vh" h="100%" pb="90px">
            <Banner />
            <Description />
            <Calculator />
            <Text fontSize="10px" textAlign="center" maxW="300px" m="0 auto">
                Texto de termos, Texto de termos Texto de termos, Texto de termos, Texto de termos
            </Text>

            <Footer />
        </Grid>
    );
}

export default CashbackCalculator;
