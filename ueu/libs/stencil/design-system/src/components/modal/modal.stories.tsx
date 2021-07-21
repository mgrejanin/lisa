import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './modal.docs.mdx';

export default {
    title: 'Components/Modal',
    component: 'apollo-modal',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        'modal-subtitle': {
            description: 'Subtitulo do modal',
            table: {
                defaultValue: { summary: 'undefined' },
            },
            control: { type: 'text' },
        },
        'modal-title': {
            description: 'Título do modal',
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
            <apollo-button onClick={() => document.querySelector('apollo-modal').open()}>Show modal</apollo-button>
            <apollo-modal {...args}>
                <p>Insira seu conteúdo aqui</p>
            </apollo-modal>
        </div>
    );
};

Base.args = {
    'modal-title': 'Apollo modal',
    'modal-subtitle': 'Descrição da modal',
    icon: 'money_business-card-atm',
};
