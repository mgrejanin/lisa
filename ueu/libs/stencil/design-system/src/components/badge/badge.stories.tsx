import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './badge.docs.mdx';

export default {
    title: 'Components/Badge',
    component: 'apollo-badge',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        quantity: {
            description: 'Valor numérico',
            table: {
                defaultValue: { summary: '99+' },
            },
            control: { type: 'text' },
        },
        variant: {
            description: 'Tipoo do badge',
            table: {
                defaultValue: { summary: 'simple' },
            },
            control: { type: 'select', options: ['simple', 'numeric'] },
        },
    },
};

export const Base = (args: any) => {
    return <apollo-badge {...args}></apollo-badge>;
};

Base.args = {
    variant: 'simple',
};

export const More = (args: any) => {
    return <apollo-badge {...args}></apollo-badge>;
};

More.args = {
    variant: 'numeric',
};

export const Numeric = (args: any) => {
    return <apollo-badge {...args}></apollo-badge>;
};

Numeric.args = {
    quantity: '20',
    variant: 'numeric',
};
