import { Token } from './../../../../../../packages/sass-functions/src/lib/tokens';
import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './grid.docs.mdx';

const spacingOptions = [null, ...Object.keys(Token.spacing)];

export default {
    title: 'Layouts/Grid',
    component: 'apollo-grid',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        'template-columns': {
            description: 'Abreviação de prop no estilo `templateColumns`',
            control: {
                type: 'text',
            },
        },
        'template-rows': {
            description: 'Abreviação de prop no estilo `templateRows`',
            control: {
                type: 'text',
            },
        },
        gap: {
            description: 'Abreviação de prop no estilo `gridGap`',
            control: {
                type: 'select',
                options: spacingOptions,
            },
        },
        height: {
            description: 'Abreviação de prop no estilo `height`',
            control: {
                type: 'text',
            },
        },
    },
};

export const Base = (args: any) => {
    return (
        <apollo-grid {...args}>
            <apollo-box bg="primary.50.base" p="4">
                Box 01
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 02
            </apollo-box>
            <apollo-box bg="primary.500.base" p="4">
                Box 03
            </apollo-box>
            <apollo-box bg="primary.800.base" p="4">
                Box 04
            </apollo-box>
            <apollo-box bg="primary.900.base" p="4">
                Box 05
            </apollo-box>
        </apollo-grid>
    );
};

Base.args = {
    'template-columns': 'repeat(5, 1fr)',
    gap: '2',
};

export const SpanningColumns = (args: any) => {
    return (
        <apollo-grid {...args}>
            <apollo-grid-item col-span="1" row-span="2" bg="primary.50.base"></apollo-grid-item>
            <apollo-grid-item col-span="2" bg="primary.200.base"></apollo-grid-item>
            <apollo-grid-item col-span="2" bg="primary.500.base"></apollo-grid-item>
            <apollo-grid-item col-span="2" bg="primary.800.base"></apollo-grid-item>
            <apollo-grid-item col-span="2" bg="primary.900.base"></apollo-grid-item>
        </apollo-grid>
    );
};

SpanningColumns.args = {
    'template-columns': 'repeat(5, 1fr)',
    'template-rows': 'repeat(2, 1fr)',
    gap: '2',
    height: '200px',
};

export const StartingEnding = (args: any) => {
    return (
        <apollo-grid {...args}>
            <apollo-grid-item col-span="2" bg="primary.200.base"></apollo-grid-item>
            <apollo-grid-item col-start="4" col-end="6" bg="primary.200.base"></apollo-grid-item>
            <apollo-grid-item col-start="2" col-end="4" bg="primary.500.base"></apollo-grid-item>
        </apollo-grid>
    );
};

StartingEnding.args = {
    'template-columns': 'repeat(5, 1fr)',
    gap: '2',
    height: '100px',
};
