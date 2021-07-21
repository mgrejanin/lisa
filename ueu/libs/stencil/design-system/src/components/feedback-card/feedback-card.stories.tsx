import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './feedback-card.docs.mdx';

export default {
    title: 'Components/Feedback Card',
    component: 'apollo-feedback-card',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        emphasis: {
            description: 'Ativa ênfase no card',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: { type: 'boolean' },
        },
        label: {
            description: 'Label do card',
            table: {
                defaultValue: { summary: 'undefined' },
            },
            control: { type: 'text' },
        },
        stacked: {
            description: 'Renderiza o card no modo stacked',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: { type: 'boolean' },
        },
        type: {
            description: 'Tipo do card',
            table: {
                defaultValue: { summary: 'done' },
            },
            control: { type: 'select', options: ['done', 'error', 'info', 'warning'] },
        },
    },
};

export const Base = (args: any) => {
    return <apollo-feedback-card {...args} />;
};

Base.args = {
    label: 'Insira aqui seu texto de feedback!',
};

export const Buttons = (args: any) => {
    return (
        <apollo-feedback-card {...args} stacked="true">
            <apollo-button variant="link" size="sm">
                Cancelar
            </apollo-button>
            <apollo-button variant="link" size="sm">
                Ok
            </apollo-button>
        </apollo-feedback-card>
    );
};

Buttons.args = {
    label: 'Insira aqui seu texto de feedback!',
};
