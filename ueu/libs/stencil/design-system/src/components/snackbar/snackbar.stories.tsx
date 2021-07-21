import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './snackbar.docs.mdx';

export default {
    title: 'Components/Snackbar',
    component: 'apollo-snackbar',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        actionButtonLabel: {
            description: 'Label do botão',
            table: {
                defaultValue: { summary: 'undefined' },
            },
            control: { type: 'text' },
        },
        emphasis: {
            description: 'Ativa ênfase no snackbar',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: { type: 'boolean' },
        },
        label: {
            description: 'Label da snackbar',
            table: {
                defaultValue: { summary: 'undefined' },
            },
            control: { type: 'text' },
        },
        position: {
            description: 'Posição do snackbar',
            ctable: {
                defaultValue: { summary: 'leading' },
            },
            control: { type: 'select', options: ['leading', 'baseline'] },
        },
        showDismissButton: {
            description: 'Renderiza um botão com a função de fechar o snackbar quando clicado',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: { type: 'boolean' },
        },
        stacked: {
            description: 'Renderiza o snackbar no modo stacked',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: { type: 'boolean' },
        },
        type: {
            description: 'Tipo do snackbar',
            ctable: {
                defaultValue: { summary: 'done' },
            },
            control: { type: 'select', options: ['done', 'error', 'info', 'warning'] },
        },
    },
};

export const Base = (args: any) => {
    return (
        <div>
            <apollo-button onClick={() => document.querySelector('apollo-snackbar').open()}>
                Show snackbar
            </apollo-button>
            <apollo-snackbar
                {...args}
                action-button-label={args.actionButtonLabel}
                show-dismiss-button={args.showDismissButton}
            />
        </div>
    );
};

Base.args = {
    label: 'Insira aqui seu texto de feedback!',
    type: 'info',
    actionButtonLabel: 'clique aqui',
    showDismissButton: 'true',
    emphasis: 'false',
};
