import React, { useState } from 'react';
import { Box, Grid, Heading, Select } from '@chakra-ui/react';
import { ApolloButton, ApolloList, ApolloListItem, ApolloTextfield } from '@picpay/design-system-react';

// Models
import { Taxes } from '../../models/taxes.interface';
import { ICalculatorData } from '../../models/calculator.interface';

// Styles
import './styles.modules.scss';

const Calculator: React.FC = () => {
    // Hooks & Variables
    const [currentValue, setCurrentValue] = useState<number>(0);
    const [data, setData] = useState<ICalculatorData>({
        taxAboveValue: 0,
        valueWithTaxes: 0,
        valuePerInstalment: 0,
        cashbackValue: 0,
    });
    const [currentTax, setCurrentTax] = useState<number>(0);
    const [currentInstalment, setCurrentInstalment] = useState<number>(1);
    const taxCard = 2.99;
    const instalments = ['1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x', '11x', '12x'];

    // Functions
    const changeTax = (value: string): void => {
        const instalment = parseFloat(value.replace('x', ''));

        setCurrentTax(Taxes[value]);
        setCurrentInstalment(instalment);
    };

    const calculate = (): void => {
        let taxAboveValue = (currentTax * currentValue) / 100;
        const valueWithTaxCard = (taxCard * (currentValue + taxAboveValue)) / 100;
        const valueWithTaxes = currentValue + taxAboveValue + valueWithTaxCard;
        const valuePerInstalment = valueWithTaxes / currentInstalment;
        let cashbackValue = (getCashbackPercentage(currentInstalment) * valueWithTaxes) / 100;
        const taxCardAboveValue = (taxCard * currentValue) / 100;

        taxAboveValue = (currentTax * (currentValue + taxCardAboveValue)) / 100;

        if (cashbackValue > 700) {
            cashbackValue = 700;
        }

        setData({ taxAboveValue, valueWithTaxes, valuePerInstalment, cashbackValue });
    };

    const getCashbackPercentage = (instalment: number): number => {
        if (instalment >= 2 && instalment <= 5) {
            return 5;
        }

        if (instalment >= 6 && instalment <= 9) {
            return 10;
        }

        if (instalment >= 10 && instalment <= 11) {
            return 17;
        }

        if (instalment >= 12) {
            return 20;
        }

        return 0;
    };

    const formatToBRL = (value: number): string =>
        value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

    return (
        <Grid justifyContent="center" alignItems="center" display="flex" mt="4" mb="4">
            <Box
                w="85%"
                maxW="300px"
                minH="150px"
                bg="white"
                borderRadius="xl"
                display="flex"
                fontSize="20px"
                justifyContent="center"
                flexFlow="column"
                p="3"
            >
                <Heading fontSize="16px" fontWeight="600" textAlign="center">
                    Quer saber o valor que vai <br /> receber de volta? <br /> Simule aqui:
                </Heading>

                <Grid templateColumns="repeat(2, auto)" columnGap="2" pt="3" className="c-calculator__selects">
                    <Box w="100%">
                        <label className="c-calculator--label"> Valor do boleto: </label>
                        <ApolloTextfield
                            type="number"
                            onKeyUp={$event =>
                                setCurrentValue(parseFloat(($event.target as HTMLApolloTextfieldElement).value))
                            }
                            noFloatingLabel
                            valuePrefix="R$"
                        ></ApolloTextfield>
                    </Box>

                    <Box
                        className="c-calculator"
                        w="100%"
                        display="flex"
                        justifyContent="end"
                        flexFlow="column"
                        alignItems="flex-end"
                    >
                        <label className="c-calculator--label"> Quantidade de parcelas: </label>
                        <Select
                            focusBorderColor="green.600"
                            size="md"
                            minH="48px"
                            minW="100px"
                            top="4px"
                            borderColor="gray.400"
                            iconColor="green.500"
                            fontSize="sm"
                            placeholder="Parcelas..."
                            onChange={$event => changeTax($event.target.value)}
                        >
                            {instalments.map((instalment: string) => (
                                <option key={instalment} value={instalment}>
                                    {instalment}
                                </option>
                            ))}
                        </Select>
                    </Box>
                </Grid>

                <Box w="100%" textAlign="center">
                    <ApolloButton variant="outlined" size="md" className="c-calculator--btn" onClick={calculate}>
                        Simular
                    </ApolloButton>
                </Box>

                <Box w="100%" textAlign="center" pt="2">
                    <ApolloList className="c-calculator__list">
                        <ApolloListItem>
                            <>
                                <small>Valor do cashback: </small>
                                <span className="c-calculator__list--cashback-total">
                                    {formatToBRL(data.cashbackValue)}
                                </span>
                            </>
                        </ApolloListItem>
                        <ApolloListItem>
                            <>
                                <small>Valor da taxa: </small>
                                <span className="c-calculator__list--tax-total">{formatToBRL(data.taxAboveValue)}</span>
                            </>
                        </ApolloListItem>
                        <ApolloListItem style={{ display: currentInstalment > 1 ? 'block' : 'none' }}>
                            <>
                                <small>Valor por parcela: </small>
                                <span className="c-calculator__list--instalment-value">
                                    {formatToBRL(data.valuePerInstalment)}
                                </span>
                            </>
                        </ApolloListItem>
                        <ApolloListItem>
                            <small>Valor total: </small>
                            <span className="c-calculator__list--total"> {formatToBRL(data.valueWithTaxes)} </span>
                        </ApolloListItem>
                    </ApolloList>
                </Box>
            </Box>
        </Grid>
    );
};

export default Calculator;
