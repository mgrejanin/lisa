import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './collapse.docs.mdx';

export default {
    title: 'Components/Collapse',
    component: 'apollo-collapse',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        collapsed: {
            description: 'Quando definido como verdadeiro, o `collapse` irá alternar aberto',
            control: {
                type: 'boolean',
            },
        },
    },
};

export const Base = (args: any) => {
    return (
        <apollo-collapse {...args}>
            <apollo-button slot="header">
                <apollo-icon slot="leading-icon" svg-icon="arrows-arrow-down"></apollo-icon>
                Button
            </apollo-button>
            <apollo-box slot="body" border="light" border-color="grayscale.100" border-radius="medium" padding="2">
                <apollo-text>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                    leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                    with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                    publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </apollo-text>
            </apollo-box>
        </apollo-collapse>
    );
};
