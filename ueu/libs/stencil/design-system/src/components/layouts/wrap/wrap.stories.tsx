import { Token } from './../../../../../../packages/sass-functions/src/lib/tokens';
import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './wrap.docs.mdx';

const spacingOptions = [null, ...Object.keys(Token.spacing)];

export default {
    title: 'Layouts/Wrap',
    component: 'apollo-wrap',
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
        <apollo-wrap {...args}>
            <apollo-box bg="primary.50.base" p="4">
                Box 01
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 02
            </apollo-box>
            <apollo-box bg="primary.500.base" p="4">
                Box 03
            </apollo-box>
            <apollo-box bg="primary.800.base" p="4" color="white">
                Box 04
            </apollo-box>
            <apollo-box bg="primary.50.base" p="4">
                Box 05
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 06
            </apollo-box>
            <apollo-box bg="primary.500.base" p="4">
                Box 07
            </apollo-box>
            <apollo-box bg="primary.800.base" p="4" color="white">
                Box 08
            </apollo-box>
            <apollo-box bg="primary.50.base" p="4">
                Box 09
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 10
            </apollo-box>
        </apollo-wrap>
    );
};

export const Spacing = (args: any) => {
    return (
        <apollo-wrap {...args}>
            <apollo-box bg="primary.50.base" p="4">
                Box 01
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 02
            </apollo-box>
            <apollo-box bg="primary.500.base" p="4">
                Box 03
            </apollo-box>
            <apollo-box bg="primary.800.base" p="4" color="white">
                Box 04
            </apollo-box>
            <apollo-box bg="primary.50.base" p="4">
                Box 05
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 06
            </apollo-box>
            <apollo-box bg="primary.500.base" p="4">
                Box 07
            </apollo-box>
            <apollo-box bg="primary.800.base" p="4" color="white">
                Box 08
            </apollo-box>
            <apollo-box bg="primary.50.base" p="4">
                Box 09
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 10
            </apollo-box>
        </apollo-wrap>
    );
};

Spacing.args = {
    spacing: '2',
};

export const Alignment = (args: any) => {
    return (
        <apollo-wrap {...args}>
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
        </apollo-wrap>
    );
};

Alignment.args = {
    'align-items': 'center',
};

export const Justify = (args: any) => {
    return (
        <apollo-wrap {...args}>
            <apollo-box bg="primary.50.base" p="4">
                Box 01
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 02
            </apollo-box>
            <apollo-box bg="primary.500.base" p="4">
                Box 03
            </apollo-box>
            <apollo-box bg="primary.800.base" p="4" color="white">
                Box 04
            </apollo-box>
            <apollo-box bg="primary.50.base" p="4">
                Box 05
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 06
            </apollo-box>
            <apollo-box bg="primary.500.base" p="4">
                Box 07
            </apollo-box>
            <apollo-box bg="primary.800.base" p="4" color="white">
                Box 08
            </apollo-box>
            <apollo-box bg="primary.50.base" p="4">
                Box 09
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 10
            </apollo-box>
        </apollo-wrap>
    );
};

Justify.args = {
    justify: 'center',
};

export const Direction = (args: any) => {
    return (
        <apollo-wrap {...args}>
            <apollo-box bg="primary.50.base" p="4">
                Box 01
            </apollo-box>
            <apollo-box bg="primary.200.base" p="4">
                Box 02
            </apollo-box>
            <apollo-box bg="primary.500.base" p="4">
                Box 03
            </apollo-box>
        </apollo-wrap>
    );
};

Direction.args = {
    direction: 'column',
};
