import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './container.docs.mdx';

const content = 'Container';

export default {
    title: 'Layouts/Container',
    component: 'apollo-center',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        fluid: {
            description: 'A largura de um container fluído é limitada pelo valor da propriedade `maxW`.',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: {
                type: 'boolean',
            },
        },
        'max-w': {
            description:
                'Determine a largura máxima do container. A largura do container aumenta com o tamanho da tela.',
            control: {
                type: 'text',
            },
        },
        'center-content': {
            description: 'Se for `true`, o container centralizará seus filhos independentemente de sua largura.',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: {
                type: 'boolean',
            },
        },
    },
};

export const Base = (args: any) => {
    return (
        <apollo-container {...args}>
            <apollo-box bg="primary" p="4">
                {content}
            </apollo-box>
        </apollo-container>
    );
};

export const Fluid = (args: any) => {
    return (
        <apollo-container {...args}>
            <apollo-box bg="primary" p="4">
                {content}
            </apollo-box>
        </apollo-container>
    );
};

Fluid.args = {
    fluid: true,
};

export const CenterContent = (args: any) => {
    return (
        <apollo-container {...args}>
            <apollo-box bg="primary" p="4">
                {content}
            </apollo-box>
        </apollo-container>
    );
};

CenterContent.args = {
    'center-content': true,
};
