import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './center.docs.mdx';

const content = 'Center';

export default {
    title: 'Layouts/Center',
    component: 'apollo-center',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        bg: {
            description: 'Abreviação de propriedade de estilo `backgroundColor`',
            control: {
                type: 'text',
            },
        },
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
    },
};

export const Base = (args: any) => {
    return <apollo-center {...args}>{content}</apollo-center>;
};

Base.args = {
    bg: 'primary',
};

export const WidthHeight = (args: any) => {
    return <apollo-center {...args}>{content}</apollo-center>;
};

WidthHeight.args = {
    bg: 'primary',
    width: '500px',
    height: '100px',
};
