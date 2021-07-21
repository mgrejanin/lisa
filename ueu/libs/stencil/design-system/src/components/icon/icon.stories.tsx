import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './icon.docs.mdx';

const sizeOptions = ['sm', 'md'];

export default {
    title: 'Design Tokens/Icons',
    component: 'apollo-icon',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        color: {
            description: 'Cor do ícone. Deve ser utilizado com tokens do DS.',
            control: { type: 'text' },
        },
        fill: {
            description: 'Cor do ícone. Deve ser utilizado quando for preciso usar hexa.',
            control: { type: 'color' },
        },
        label: {
            description: 'Texto de ajuda. Para acessibilidade.',
            control: { type: 'text' },
        },
        role: {
            description: 'Descrição de funcionalidade.',
            control: { type: 'text' },
        },
        size: {
            description: 'O tamanho do ícone',
            table: {
                defaultValue: { summary: 'md' },
            },
            control: {
                type: 'select',
                options: sizeOptions,
            },
        },
        'svg-icon': {
            description: 'O nome do ícone SVG.',
            control: { type: 'text' },
        },
    },
};

export const Base = (args: any) => {
    return <apollo-icon {...args}></apollo-icon>;
};

Base.args = {
    'svg-icon': 'interface-bell',
    size: 'md',
};

export const Slot = (args: any) => {
    return (
        <apollo-icon {...args} class="material-icon">
            keyboard_arrow_right
        </apollo-icon>
    );
};

Slot.args = {
    color: 'brand.base',
    size: 'md',
};
