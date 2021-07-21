import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './dialog.docs.mdx';

export default {
    title: 'Components/Dialog',
    component: 'apollo-dialog',
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
        figure: {
            description: 'Seta a versão Large do ícone para devices mobile',
            table: {
                defaultValue: { summary: 'undefined' },
            },
            control: { type: 'text' },
        },
        icon: {
            description: 'Ícone',
            table: {
                defaultValue: { summary: 'undefined' },
            },
            control: { type: 'text' },
        },
    },
};

export const Base = (args: any) => {
    return (
        <div>
            <apollo-button onClick={() => document.querySelector('apollo-dialog').open()}>Show dialog</apollo-button>
            <apollo-dialog {...args}>
                <p>Insira seu conteúdo aqui</p>
            </apollo-dialog>
        </div>
    );
};

Base.args = {
    'dialog-title': 'Apollo Dialog',
    'dialog-subtitle': 'Descrição da Dialog',
    'cancel-button-label': 'Cancelar',
    'confirm-button-label': 'Confirmar',
};
