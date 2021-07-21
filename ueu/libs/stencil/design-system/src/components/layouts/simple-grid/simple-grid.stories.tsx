import { Token } from './../../../../../../packages/sass-functions/src/lib/tokens';
import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './simple-grid.docs.mdx';

const spacingOptions = [null, ...Object.keys(Token.spacing)];

export default {
    title: 'Layouts/SimpleGrid',
    component: 'apollo-simple-grid',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        columns: {
            description: 'O número de colunas',
            control: {
                type: 'text',
            },
        },
        spacing: {
            description: 'Passe a propriedade `spacing` para aplicar espaçamento consistente entre cada filho',
            control: {
                type: 'select',
                options: spacingOptions,
            },
        },
        'min-child-width': {
            description:
                'A largura na qual os elementos filho serão divididos em colunas. Passe um número para valores de pixel ou uma string para qualquer outro comprimento CSS válido.',
            control: {
                type: 'text',
            },
        },
    },
};

export const Base = (args: any) => {
    return (
        <apollo-simple-grid {...args}>
            <apollo-box bg="primary.50.base" p="4">
                Box 01
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 02
            </apollo-box>
            <apollo-box bg="primary.500.base" p="4">
                Box 03
            </apollo-box>
            <apollo-box bg="primary.50.base" p="4">
                Box 04
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 05
            </apollo-box>
            <apollo-box bg="primary.500.base" p="4">
                Box 06
            </apollo-box>
            <apollo-box bg="primary.50.base" p="4">
                Box 07
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 08
            </apollo-box>
        </apollo-simple-grid>
    );
};

Base.args = {
    columns: '4',
};

export const Spacing = (args: any) => {
    return (
        <apollo-simple-grid {...args}>
            <apollo-box bg="primary.50.base" p="4">
                Box 01
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 02
            </apollo-box>
            <apollo-box bg="primary.500.base" p="4">
                Box 03
            </apollo-box>
            <apollo-box bg="primary.50.base" p="4">
                Box 04
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 05
            </apollo-box>
            <apollo-box bg="primary.500.base" p="4">
                Box 06
            </apollo-box>
            <apollo-box bg="primary.50.base" p="4">
                Box 07
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 08
            </apollo-box>
        </apollo-simple-grid>
    );
};

Spacing.args = {
    columns: '4',
    spacing: '2',
};

export const AutoResponsive = (args: any) => {
    return (
        <apollo-simple-grid {...args}>
            <apollo-box bg="primary.50.base" p="4">
                Box 01
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 02
            </apollo-box>
            <apollo-box bg="primary.500.base" p="4">
                Box 03
            </apollo-box>
            <apollo-box bg="primary.50.base" p="4">
                Box 04
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 05
            </apollo-box>
            <apollo-box bg="primary.500.base" p="4">
                Box 06
            </apollo-box>
            <apollo-box bg="primary.50.base" p="4">
                Box 07
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 08
            </apollo-box>
        </apollo-simple-grid>
    );
};

AutoResponsive.args = {
    'min-child-width': '150px',
    spacing: '2',
};
