import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './toolbar.docs.mdx';

export default {
    title: 'Surface/Toolbar',
    component: 'apollo-toolbar',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        'is-search': {
            description: 'Adiciona um campo de pesquisa principal',
            table: {
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        apolloSearchChange: {
            action: 'apolloSearchChange',
            description:
                'Evento disparado quando o usuário termina de digitar e o tempo de atraso de envio do evento for concluído. `(() => InputEvent)`',
        },
        apolloSearchFocus: {
            action: 'apolloSearchFocus',
            description: 'Evento disparado quando o campo recebe foco. `(() => FocusEvent)`',
        },
        apolloSearchBlur: {
            action: 'apolloSearchBlur',
            description: 'Evento disparado quando o campo perde o foco. `(() => FocusEvent)`',
        },
    },
};

export const Base = (args: any) => {
    return (
        <apollo-toolbar {...args}>
            <apollo-logo slot="start" nickname="H">
                herodash
            </apollo-logo>
            <apollo-toolbar-actions slot="end"></apollo-toolbar-actions>
        </apollo-toolbar>
    );
};

export const Search = (args: any) => {
    return (
        <apollo-toolbar {...args}>
            <apollo-logo slot="start" nickname="H">
                herodash
            </apollo-logo>
            <apollo-toolbar-actions slot="end"></apollo-toolbar-actions>
        </apollo-toolbar>
    );
};

Search.args = {
    'is-search': true,
};

export const Actions = (args: any) => {
    return (
        <apollo-toolbar {...args}>
            <apollo-logo slot="start" nickname="H">
                herodash
            </apollo-logo>
            <apollo-toolbar-actions slot="end">
                <apollo-icon-button icon="multimedia-image-v" icon-pack="multimedia" size="sm"></apollo-icon-button>
                <apollo-icon-button icon="multimedia-image-v" icon-pack="multimedia" size="sm"></apollo-icon-button>
                <apollo-icon-button icon="multimedia-image-v" icon-pack="multimedia" size="sm"></apollo-icon-button>
            </apollo-toolbar-actions>
        </apollo-toolbar>
    );
};

export const Menu = (args: any) => {
    return (
        <apollo-toolbar {...args}>
            <apollo-logo slot="start" nickname="H">
                herodash
            </apollo-logo>
            <apollo-menu-item href="#">Carteira</apollo-menu-item>
            <apollo-menu-item href="#">Transações</apollo-menu-item>
            <apollo-menu-item href="#">Gestão</apollo-menu-item>
            <apollo-menu-item href="#">Ajustes</apollo-menu-item>
            <apollo-toolbar-actions slot="end"></apollo-toolbar-actions>
        </apollo-toolbar>
    );
};
