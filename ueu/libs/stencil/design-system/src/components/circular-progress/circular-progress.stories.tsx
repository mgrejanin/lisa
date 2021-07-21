import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './circular-progress.docs.mdx';

export default {
    title: 'Components/Circular Progress',
    component: 'apollo-circular-progress',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        determinate: {
            description: 'Deixa o componente em estado fixo',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: { type: 'boolean' },
        },
        invert: {
            description: 'Aplica a cor branca na linha',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: { type: 'boolean' },
        },
        label: {
            description: 'Texto vinculado ao componente',
            table: {
                defaultValue: { summary: '' },
            },
            control: { type: 'text' },
        },
        progress: {
            description: 'Tamanho do progresso. Min: 0 | Max: 1',
            table: {
                defaultValue: { summary: '1' },
            },
            control: { type: 'number' },
        },
        radius: {
            description: 'Raio do circulo',
            table: {
                defaultValue: { summary: '8.75' },
            },
            control: { type: 'number' },
        },
        stroke: {
            description: 'Largura da linha',
            table: {
                defaultValue: { summary: '2.5' },
            },
            control: { type: 'number' },
        },
    },
};

export const Base = (args: any) => {
    return <apollo-circular-progress {...args}></apollo-circular-progress>;
};
