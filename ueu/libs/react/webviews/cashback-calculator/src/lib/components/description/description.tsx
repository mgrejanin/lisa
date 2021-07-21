import React from 'react';
import { Grid, Box, Text, Heading } from '@chakra-ui/react';

import './styles.modules.scss';

const Description: React.FC = () => {
    const instalments = [
        {
            title: '2x até 5x',
            percentage: '5%',
        },
        {
            title: '6x até 9x',
            percentage: '10%',
        },
        {
            title: '10x até 11x',
            percentage: '17%',
        },
        {
            title: 'em 12x',
            percentage: '20%',
        },
    ];

    return (
        <Grid justifyContent="center" alignItems="center" display="flex" pt="5" maxW="500px" m="0 auto">
            <Box
                w="100%"
                display="flex"
                fontSize="20px"
                justifyContent="center"
                alignItems="center"
                flexFlow="column"
                pl={['3%', 4, 4, 4]}
                pr={['3%', 4, 4, 4]}
            >
                <Text fontSize="base" textAlign="center">
                    <span className="c-description--strong">
                        Aqui no PicPay você parcela qualquer boleto em até 12X e ainda ganha dinheiro de volta.
                    </span>{' '}
                    Da conta de água e luz até compras em lojas: parcele de tudo com PicPay!
                </Text>

                <Heading
                    as="h3"
                    mt="3"
                    mb="3"
                    pt="1"
                    pb="1"
                    fontSize="2xl"
                    borderTop="4px solid"
                    borderTopColor="green.400"
                    borderBottom="4px solid"
                    borderBottomColor="green.400"
                    className="c-description--featured"
                >
                    PARCELOU, GANHOU:
                </Heading>

                <Grid
                    templateColumns="repeat(4, 1fr)"
                    gap={2}
                    justifyContent="space-between"
                    alignItems="center"
                    display="flex"
                    pt="3"
                    pb="3"
                    width="100%"
                    maxW="500px"
                    m="0 auto"
                >
                    {instalments.map(instalment => (
                        <Box
                            key={instalment.title}
                            w="100%"
                            textAlign="center"
                            bgColor="green.500"
                            borderRadius="md"
                            overflow="hidden"
                        >
                            <Box
                                w="100%"
                                bgColor="#223322"
                                color="white"
                                fontWeight="600"
                                className="c-description--title"
                                textTransform="uppercase"
                                p="3px"
                            >
                                {instalment.title}
                            </Box>
                            <Text
                                color="#223322"
                                fontWeight="bold"
                                pr="1"
                                pl="1"
                                pt="1"
                                className="c-description--percentage"
                            >
                                {instalment.percentage}
                            </Text>
                            <Text color="#223322" fontWeight="600" className="c-description--text" pb="1">
                                DE VOLTA
                            </Text>
                        </Box>
                    ))}
                </Grid>

                <Text fontSize="12px" textAlign="center" pr="2" pl="2">
                    <span className="c-description--strong">E o melhor:</span> seu dinheiro de volta é calculado com
                    base no valor do boleto + o valor da taxa. E mesmo se for um boleto com desconto ou já vencido você
                    também pode parcelar.
                    <br />
                    <span className="c-description--strong">Então aproveite!</span>
                </Text>
            </Box>
        </Grid>
    );
};

export default Description;
