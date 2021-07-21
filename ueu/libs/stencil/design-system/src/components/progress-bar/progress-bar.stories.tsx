import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './progress-bar.docs.mdx';

export default {
    title: 'Components/Progress Bar',
    component: 'apollo-progress-bar',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        fraction: {
            description: 'Valor da fração, que equivale ao progresso atual',
            table: {
                defaultValue: { summary: 'undefined' },
            },
            control: { type: 'number' },
        },
        total: {
            description: 'Valor total, que equivale a 100% do progresso',
            table: {
                defaultValue: { summary: 'undefined' },
            },
            control: { type: 'number' },
        },
    },
};

export const Base = (args: any) => {
    return <apollo-progress-bar {...args}></apollo-progress-bar>;
};

Base.args = {
    fraction: '50',
    total: '100',
};
