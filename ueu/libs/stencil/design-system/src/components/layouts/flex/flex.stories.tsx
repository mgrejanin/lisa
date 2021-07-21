import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './flex.docs.mdx';

export default {
    title: 'Layouts/Flex',
    component: 'apollo-flex',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        spacer: {
            description:
                'Cria um espaçamento igual entre os elementos. Mantendo o primeiro grudado no início e o último no final.',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: {
                type: 'boolean',
            },
        },
        direction: {
            description: 'Abreviação de prop no estilo `flex-direction`',
            control: {
                type: 'select',
                options: ['column', 'row'],
            },
        },
        reverse: {
            description: 'Pode mudar a ordem usando `reverse`',
            control: {
                type: 'select',
                options: ['column', 'row'],
            },
        },
        'align-items': {
            description: 'Prop de estilo `align-items`',
            control: {
                type: 'select',
                options: ['flex-start', 'center', 'flex-end'],
            },
        },
        justify: {
            description: 'Abreviação de prop de estilo `justify-content`',
            control: {
                type: 'select',
                options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
            },
        },
        wrap: {
            description: 'Abreviação de prop no estilo `flex-wrap` adiciona o valor `wrap`',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: {
                type: 'boolean',
            },
        },
        grow: {
            description: 'Abreviação de prop no estilo `flex-grow`',
            control: {
                type: 'number',
            },
        },
    },
};

export const Base = (args: any) => {
    return (
        <apollo-flex {...args}>
            <apollo-box bg="primary.50.base" p="4">
                Box 1
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 2
            </apollo-box>
            <apollo-box bg="primary.500.base" p="4">
                Box 3
            </apollo-box>
        </apollo-flex>
    );
};

export const Spacer = (args: any) => {
    return (
        <apollo-flex {...args}>
            <apollo-box bg="primary.200.base" p="4">
                Box 1
            </apollo-box>
            <apollo-box bg="primary.500.base" p="4">
                Box 2
            </apollo-box>
        </apollo-flex>
    );
};

Spacer.args = {
    spacer: true,
};

export const Direction = (args: any) => {
    return (
        <apollo-flex {...args}>
            <apollo-box bg="primary.50.base" p="4">
                Box 1
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 2
            </apollo-box>
            <apollo-box bg="primary.500.base" p="4">
                Box 3
            </apollo-box>
        </apollo-flex>
    );
};

Direction.args = {
    direction: 'column',
};

export const Reverse = (args: any) => {
    return (
        <apollo-flex {...args}>
            <apollo-box bg="primary.50.base" p="4">
                Box 1
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 2
            </apollo-box>
            <apollo-box bg="primary.500.base" p="4">
                Box 3
            </apollo-box>
        </apollo-flex>
    );
};

Reverse.args = {
    reverse: 'column',
};

export const Alignment = (args: any) => {
    return (
        <apollo-flex {...args}>
            <apollo-box bg="primary.50.base" p="4">
                Box 1
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 2
            </apollo-box>
            <apollo-box bg="primary.500.base" p="4">
                Box 3
            </apollo-box>
            <apollo-box bg="primary.800.base" color="white" p="2">
                Box 04
            </apollo-box>
        </apollo-flex>
    );
};

Alignment.args = {
    'align-items': 'center',
};

export const Justify = (args: any) => {
    return (
        <apollo-flex {...args}>
            <apollo-box bg="primary.50.base" p="4">
                Box 1
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 2
            </apollo-box>
            <apollo-box bg="primary.500.base" p="4">
                Box 3
            </apollo-box>
        </apollo-flex>
    );
};

Justify.args = {
    justify: 'center',
};

export const Wrap = (args: any) => {
    return (
        <apollo-flex {...args}>
            <apollo-box bg="primary.50.base" p="4">
                Box 1
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 2
            </apollo-box>
            <apollo-box bg="primary.500.base" p="4">
                Box 3
            </apollo-box>
            <apollo-box bg="primary.50.base" p="4">
                Box 4
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 5
            </apollo-box>
            <apollo-box bg="primary.500.base" p="4">
                Box 6
            </apollo-box>
            <apollo-box bg="primary.50.base" p="4">
                Box 7
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 8
            </apollo-box>
            <apollo-box bg="primary.500.base" p="4">
                Box 9
            </apollo-box>
            <apollo-box bg="primary.50.base" p="4">
                Box 10
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 11
            </apollo-box>
            <apollo-box bg="primary.500.base" p="4">
                Box 12
            </apollo-box>
        </apollo-flex>
    );
};

Wrap.args = {
    wrap: true,
};
