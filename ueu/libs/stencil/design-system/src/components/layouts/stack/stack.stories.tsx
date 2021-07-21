import { Token } from './../../../../../../packages/sass-functions/src/lib/tokens';
import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './stack.docs.mdx';

const spacingOptions = [null, ...Object.keys(Token.spacing)];

export default {
    title: 'Layouts/Stack',
    component: 'apollo-stack',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        spacing: {
            description: 'Passe a propriedade `spacing` para aplicar espaçamento consistente entre cada filho',
            control: {
                type: 'select',
                options: spacingOptions,
            },
        },
        direction: {
            description: 'Abreviação de propriedade de estilo `flex-direction`',
            control: {
                type: 'select',
                options: ['column', 'row'],
            },
        },
        'align-items': {
            description: 'Propriedade de estilo `align-items`',
            control: {
                type: 'select',
                options: ['flex-start', 'center', 'flex-end'],
            },
        },
        justify: {
            description: 'Abreviação de propriedade de estilo `justify-content`',
            control: {
                type: 'select',
                options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
            },
        },
    },
};

export const Base = (args: any) => {
    return (
        <apollo-stack {...args}>
            <apollo-box bg="primary.50.base" p="4">
                Box 01
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 02
            </apollo-box>
            <apollo-box bg="primary.500.base" p="4">
                Box 03
            </apollo-box>
        </apollo-stack>
    );
};

export const Direction = (args: any) => {
    return (
        <apollo-stack {...args}>
            <apollo-box bg="primary.50.base" p="4">
                Box 01
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 02
            </apollo-box>
            <apollo-box bg="primary.500.base" p="4">
                Box 03
            </apollo-box>
        </apollo-stack>
    );
};

Direction.args = {
    direction: 'column',
};

export const Alignment = (args: any) => {
    return (
        <apollo-stack {...args}>
            <apollo-box bg="primary.50.base" p="4">
                Box 01
            </apollo-box>
            <apollo-box bg="primary.200.base" p="2">
                Box 02
            </apollo-box>
            <apollo-box bg="primary.500.base" p="1">
                Box 03
            </apollo-box>
            <apollo-box bg="primary.800.base" p="2">
                Box 04
            </apollo-box>
            <apollo-box bg="primary.900.base" p="4">
                Box 05
            </apollo-box>
        </apollo-stack>
    );
};

Alignment.args = {
    'align-items': 'center',
};

export const Justify = (args: any) => {
    return (
        <apollo-stack {...args}>
            <apollo-box bg="primary.50.base" p="4">
                Box 01
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 02
            </apollo-box>
            <apollo-box bg="primary.500.base" p="4">
                Box 03
            </apollo-box>
        </apollo-stack>
    );
};

Justify.args = {
    justify: 'center',
};
