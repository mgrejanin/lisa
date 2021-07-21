import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './avatar.docs.mdx';

export default {
    title: 'Components/Avatar',
    component: 'apollo-avatar',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        alt: {
            description: 'Alt da imagem do avatar',
            table: {
                defaultValue: { summary: '' },
            },
            control: { type: 'text' },
        },
        border: {
            description: 'Para alterar o tamanho da borda do avatar, você pode passar a propriedade `border`',
            table: {
                defaultValue: { summary: 'light' },
            },
            control: { type: 'select', options: ['none', 'light', 'medium', 'strong'] },
        },
        radius: {
            description: 'Para alterar o arredondamento do avatar, você pode passar a propriedade `radius`',
            table: {
                defaultValue: { summary: 'full' },
            },
            control: { type: 'select', options: ['none', 'light', 'medium', 'strong', 'full'] },
        },
        src: {
            description: 'Imagem do avatar',
            table: {
                defaultValue: { summary: '' },
            },
            control: { type: 'text' },
        },
        size: {
            description: 'Para aumentar o tamanho do avatar, você pode passar a propriedade `size`.',
            table: {
                defaultValue: { summary: 'medium' },
            },
            control: { type: 'select', options: ['xsmall', 'small', 'medium', 'large', 'xlarge'] },
        },
    },
};

export const Base = (args: any) => {
    return <apollo-avatar {...args}></apollo-avatar>;
};
