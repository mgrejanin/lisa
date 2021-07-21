import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './switch-toggle.docs.mdx';

export default {
    title: 'Components/Switch Toggle',
    component: 'apollo-switch-toggle',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        disabled: {
            description: 'Habilita/Desabilita o estado desativado do componente',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: {
                type: 'boolean',
            },
        },
        checked: {
            description: 'Indica se o componente está selecionado ',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: {
                type: 'boolean',
            },
        },
        label: {
            description: 'Texto vinculado ao componente',
            table: {
                defaultValue: { summary: 'undefined' },
            },
            control: {
                type: 'text',
            },
        },
        nowrap: {
            description: 'nowrap',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: {
                type: 'boolean',
            },
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
    return <apollo-switch-toggle {...args} />;
};

Base.args = {
    label: 'PicPay Lovers',
};
