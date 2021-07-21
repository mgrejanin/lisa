import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './feedback-dialog.docs.mdx';

export default {
    title: 'Components/Feedback Dialog',
    component: 'apollo-feedback-dialog',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        'cancel-button-label': {
            description: 'Label do botão cancelar',
            table: {
                defaultValue: { summary: 'undefined' },
            },
            control: { type: 'text' },
        },
        'confirm-button-label': {
            description: 'Label do botão confirmar',
            table: {
                defaultValue: { summary: 'undefined' },
            },
            control: { type: 'text' },
        },
        'dialog-subtitle': {
            description: 'Subtitulo do dialog',
            table: {
                defaultValue: { summary: 'undefined' },
            },
            control: { type: 'text' },
        },
        'dialog-title': {
            description: 'Título do dialog',
            table: {
                defaultValue: { summary: 'undefined' },
            },
            control: { type: 'text' },
        },
        type: {
            description: 'Tipo do dialog',
            table: {
                defaultValue: { summary: 'undefined' },
            },
            control: { type: 'select', options: ['done', 'error', 'info', 'warning'] },
        },
        'use-figure-version-for-mobile': {
            description: 'Seta a versão Large do ícone para devices mobile',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: { type: 'boolean' },
        },
    },
};

export const Base = (args: any) => {
    return (
        <div>
            <apollo-button onClick={() => document.querySelector('apollo-feedback-dialog').open()}>
                Show dialog
            </apollo-button>
            <apollo-feedback-dialog {...args}>
                <p>Insira seu conteúdo aqui</p>
            </apollo-feedback-dialog>
        </div>
    );
};

Base.args = {
    'dialog-title': 'Apollo Dialog',
    'dialog-subtitle': 'Descrição da Dialog',
    'cancel-button-label': 'Cancelar',
    'confirm-button-label': 'Confirmar',
    'use-figure-version-for-mobile': false,
    type: 'info',
};