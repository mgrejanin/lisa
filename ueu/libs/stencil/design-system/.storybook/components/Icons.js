import icons from './icons.json';
import { useState } from 'react';

const groupBy = (lista, coluna) => {
    var colunas = {};
    var resultado = [];

    lista.forEach(function (item) {
        var reg = {};

        colunas[item[coluna]] = colunas[item[coluna]] || [];

        for (var i in item) if (i != coluna) reg[i] = item[i];

        colunas[item[coluna]].push(reg);
    });

    for (var i in colunas) resultado.push({ key: i, values: colunas[i] });

    return resultado;
};

const Icons = () => {
    const [search, setSearch] = useState('');

    const handleSearch = event => {
        setSearch(event.target.value);
    };

    const activeIcons = icons.icons.filter(icon => {
        return icon.name.toString().includes(search);
    });

    const groupIcons = groupBy(activeIcons, 'category');

    return (
        <apollo-box mt="4">
            <apollo-flex direction="column">
                <apollo-textfield
                    label="Pesquisar"
                    type="search"
                    no-floating-label="true"
                    trailing-clear-icon="true"
                    onInput={handleSearch}
                ></apollo-textfield>
                {!groupIcons.length > 0 ? (
                    <apollo-box mt="6" mb="2">
                        <apollo-text>Nenhum ícone encontrado</apollo-text>
                    </apollo-box>
                ) : (
                    groupIcons.map((item, index) => (
                        <apollo-box key={index.toString()}>
                            <apollo-box mt="6" mb="2">
                                <apollo-heading>{item.key.toUpperCase()}</apollo-heading>
                            </apollo-box>
                            <apollo-simple-grid columns="6">
                                {item.values.map((symbol, i) => (
                                    <apollo-box key={i.toString()} mt="2" mb="2" pl="2" pr="2">
                                        <apollo-flex direction="column" alignItems="center" justify="center">
                                            <apollo-box
                                                p="half"
                                                bg="brand.50"
                                                border-radius="medium"
                                                width="50px"
                                                height="50px"
                                                mb="1"
                                            >
                                                <apollo-center>
                                                    <apollo-icon svg-icon={symbol.name}></apollo-icon>
                                                </apollo-center>
                                            </apollo-box>
                                            <apollo-text font-size="sm">{symbol.name}</apollo-text>
                                        </apollo-flex>
                                    </apollo-box>
                                ))}
                            </apollo-simple-grid>
                        </apollo-box>
                    ))
                )}
            </apollo-flex>
        </apollo-box>
    );
};

/**
 * @component
 */
export default Icons;
