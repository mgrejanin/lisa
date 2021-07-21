import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './ripple.docs.mdx';

export default {
    title: 'Components/Ripple',
    component: 'apollo-ripple',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        width: {
            description: 'Abreviação de propriedade de estilo `width`',
            control: {
                type: 'text',
            },
        },
        height: {
            description: 'Abreviação de propriedade de estilo `height`',
            control: {
                type: 'text',
            },
        },
        round: {
            description: 'Adiciona o conteúdo redondo',
            table: {
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
    },
};

export const Base = (args: any) => {
    return (
        <apollo-ripple {...args}>
            <apollo-center>Clique aqui</apollo-center>
        </apollo-ripple>
    );
};

Base.args = {
    width: '200px',
    height: '200px',
};

export const Round = (args: any) => {
    return (
        <apollo-ripple {...args}>
            <apollo-center>
                <apollo-icon svg-icon="interface-bell" />
            </apollo-center>
        </apollo-ripple>
    );
};

Round.args = {
    width: '50px',
    height: '50px',
    round: true,
};
