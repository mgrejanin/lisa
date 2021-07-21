import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './checkbox.docs.mdx';

export default {
    title: 'Components/Checkbox',
    component: 'apollo-checkbox',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        checked: {
            description: 'Indica se o componente está selecionado',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: { type: 'boolean' },
        },
        disabled: {
            description: 'Habilita/Desabilita o estado desativado do componente',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: { type: 'boolean' },
        },
        indeterminate: {
            description: 'Habilita/Desabilita o estado indeterminado do componente',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: { type: 'boolean' },
        },
        invalid: {
            description: 'Habilita o estado inválido do input',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: { type: 'boolean' },
        },
        name: {
            description: 'Referência do input nativo',
            table: {
                defaultValue: { summary: 'undefined' },
            },
            control: { type: 'text' },
        },
        nowrap: {
            description: 'nowrap',
            table: {
                defaultValue: { summary: 'true' },
            },
            control: { type: 'boolean' },
        },
        position: {
            description: 'Posição do texto com base no componente',
            table: {
                defaultValue: { summary: 'after' },
            },
            control: { type: 'select', options: ['after', 'before'] },
        },
    },
};

export const Base = (args: any) => {
    return <apollo-checkbox {...args}>PicPay Lovers</apollo-checkbox>;
};

Base.args = {
    nowrap: 'true',
};
