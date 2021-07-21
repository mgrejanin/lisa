import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './feedback-page.docs.mdx';

export default {
    title: 'Components/Feedback Page',
    component: 'apollo-feedback-page',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        'page-subtitle': {
            description: 'Subtítulo da feedback page',
            table: {
                defaultValue: { summary: 'undefined' },
            },
            control: { type: 'text' },
        },
        'page-title': {
            description: 'Título da feedback page',
            table: {
                defaultValue: { summary: 'undefined' },
            },
            control: { type: 'text' },
        },
        'use-figure': {
            description: 'Seta a versão Figure',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: { type: 'boolean' },
        },
        type: {
            description: 'Tipo da feedback page',
            table: {
                defaultValue: { summary: 'undefined' },
            },
            control: { type: 'select', options: ['done', 'error', 'info', 'warning'] },
        },
    },
};

export const Base = (args: any) => {
    return (
        <div>
            <apollo-feedback-page {...args}>
                <apollo-feedback-page-actions>
                    <apollo-button variant="unelevated" danger={args.type === 'error' ? true : undefined}>
                        Ok, entendi
                    </apollo-button>
                    <apollo-button variant="link">Por que preciso aguardar?</apollo-button>
                </apollo-feedback-page-actions>
            </apollo-feedback-page>
        </div>
    );
};

Base.args = {
    'page-title': 'Apollo Feedback Page',
    'page-subtitle': 'Descrição da Feedback Page',
    type: 'info',
};
