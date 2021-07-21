import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './list.docs.mdx';

export default {
    title: 'Components/List',
    component: 'apollo-list',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        dense: {
            description: 'Adiciona um estilo para a lista parecer mais compacta',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: { type: 'boolean' },
        },
    },
};

export const Base = (args: any) => {
    return (
        <apollo-list {...args}>
            <apollo-list-item>Item1</apollo-list-item>
            <apollo-list-item>Item2</apollo-list-item>
        </apollo-list>
    );
};

export const LeadingIcon = (args: any) => {
    return (
        <apollo-list {...args}>
            <apollo-list-item>
                <apollo-icon slot="leading" svg-icon="objects-heart" size="sm"></apollo-icon>
                Item1
            </apollo-list-item>
            <apollo-list-item>
                <apollo-icon slot="leading" svg-icon="objects-heart" size="sm"></apollo-icon>
                Item2
            </apollo-list-item>
        </apollo-list>
    );
};

export const TrailingIcon = (args: any) => {
    return (
        <apollo-list {...args}>
            <apollo-list-item>
                Item1
                <apollo-icon slot="trailing" svg-icon="objects-heart" size="sm"></apollo-icon>
            </apollo-list-item>
            <apollo-list-item>
                Item2
                <apollo-icon slot="trailing" svg-icon="objects-heart" size="sm"></apollo-icon>
            </apollo-list-item>
        </apollo-list>
    );
};

export const TrailingCheckbox = (args: any) => {
    return (
        <apollo-list {...args}>
            <apollo-list-item>
                Item1
                <apollo-checkbox slot="trailing"></apollo-checkbox>
            </apollo-list-item>
            <apollo-list-item>
                Item2
                <apollo-checkbox slot="trailing"></apollo-checkbox>
            </apollo-list-item>
        </apollo-list>
    );
};

export const TrailingRadio = (args: any) => {
    return (
        <apollo-list {...args}>
            <apollo-list-item>
                Item1
                <apollo-radio slot="trailing" name="trailingradius"></apollo-radio>
            </apollo-list-item>
            <apollo-list-item>
                Item2
                <apollo-radio slot="trailing" name="trailingradius"></apollo-radio>
            </apollo-list-item>
        </apollo-list>
    );
};

export const GroupList = (args: any) => {
    return (
        <apollo-list {...args}>
            <apollo-list-group header="Title1">
                <apollo-list-item>Item1</apollo-list-item>
                <apollo-list-item>Item2</apollo-list-item>
            </apollo-list-group>
            <apollo-list-divider></apollo-list-divider>
            <apollo-list-group header="Title2">
                <apollo-list-item>Item1</apollo-list-item>
                <apollo-list-item>Item2</apollo-list-item>
            </apollo-list-group>
        </apollo-list>
    );
};
