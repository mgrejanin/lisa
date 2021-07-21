import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './card.docs.mdx';

export default {
    title: 'Components/Card',
    component: 'apollo-card',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        variant: {
            description: 'Estilo do card',
            table: {
                defaultValue: { summary: 'unelevated' },
            },
            control: { type: 'select', options: ['outlined', 'unelevated'] },
        },
        radius: {
            description: 'Arredondamento da borda',
            table: {
                defaultValue: { summary: 'light' },
            },
            control: { type: 'select', options: ['light', 'medium', 'strong'] },
        },
    },
};

export const Base = (args: any) => {
    return (
        <apollo-card {...args}>
            <apollo-card-content>
                <h4>Card title</h4>
                <p>Secondary text</p>
            </apollo-card-content>
        </apollo-card>
    );
};

export const Actions = (args: any) => {
    return (
        <apollo-card {...args}>
            <apollo-card-content>
                <h1>Card title</h1>
                <p>Secondary text</p>
            </apollo-card-content>
            <apollo-card-actions>
                <apollo-card-action-buttons>
                    <apollo-button>click here</apollo-button>
                    <apollo-button variant="link">see more</apollo-button>
                </apollo-card-action-buttons>
            </apollo-card-actions>
        </apollo-card>
    );
};

export const Media = (args: any) => {
    return (
        <apollo-card {...args}>
            <apollo-card-media image="https://picsum.photos/600/240" format="16:9"></apollo-card-media>
            <apollo-card-content>
                <h1>Card title</h1>
                <p>Secondary text</p>
            </apollo-card-content>
        </apollo-card>
    );
};
