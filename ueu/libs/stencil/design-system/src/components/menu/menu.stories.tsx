import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './menu.docs.mdx';

export default {
    title: 'Components/Menu',
    component: 'apollo-menu',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        defaultOpen: {
            description: 'Estado de aberto/fechado do menu',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: { type: 'boolean' },
        },
        select: {
            description: 'Se é menu do select',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: { type: 'boolean' },
        },
    },
};

export const Base = (args: any) => {
    return (
        <div style={{ height: '200px' }}>
            <apollo-menu {...args}>
                <apollo-button slot="anchor">Open Menu</apollo-button>
                <apollo-list>
                    <apollo-list-item>Item 1</apollo-list-item>
                    <apollo-list-item>Item 2</apollo-list-item>
                    <apollo-list-item>Item 3</apollo-list-item>
                    <apollo-list-item>Item 4</apollo-list-item>
                </apollo-list>
            </apollo-menu>
        </div>
    );
};

export const WithGroup = (args: any) => {
    return (
        <div style={{ height: '300px' }}>
            <apollo-menu {...args}>
                <apollo-button slot="anchor">Open Menu</apollo-button>
                <apollo-list>
                    <apollo-list-group header="Primeiro Grupo">
                        <apollo-list-item>Item 1</apollo-list-item>
                        <apollo-list-item>Item 2</apollo-list-item>
                    </apollo-list-group>
                    <apollo-list-divider></apollo-list-divider>
                    <apollo-list-group header="Segundo Grupo">
                        <apollo-list-item>Item 3</apollo-list-item>
                        <apollo-list-item>Item 4</apollo-list-item>
                    </apollo-list-group>
                </apollo-list>
            </apollo-menu>
        </div>
    );
};
