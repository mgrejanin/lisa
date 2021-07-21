import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './template-skeleton.docs.mdx';

export default {
    title: 'Components/Template Skeleton',
    component: 'apollo-template-skeleton',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        align: {
            description: 'Alinhamento dos skeletons',
            table: {
                defaultValue: { summary: 'left' },
            },
            control: { type: 'select', options: ['center', 'left', 'right'] },
        },
        avatar: {
            description: 'Define se o template irá exibir o skeleton de avatar',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: {
                type: 'boolean',
            },
        },
        avatarSize: {
            description: 'Tamanhos pré definidos, sobrescreve as propriedades width e height.',
            table: {
                defaultValue: { summary: 'null' },
            },
            control: { type: 'select', options: ['sm', 'md', 'lg', 'xlg', 'xxlg', 'xxxlg'] },
        },
        count: {
            description: 'Quantidade de templates skeletons a serem carregados',
            table: {
                defaultValue: { summary: '1' },
            },
            control: {
                type: 'number',
            },
        },
        showWarnings: {
            description: 'Habilita os warnings para animações não suportadas',
            table: {
                defaultValue: { summary: 'true' },
            },
            control: {
                type: 'boolean',
            },
        },
        textCount: {
            description: 'Quantidade de skeletons do tipo texto a serem carregados',
            table: {
                defaultValue: { summary: '1' },
            },
            control: {
                type: 'number',
            },
        },
        textHeight: {
            description: 'Altura do skeleton ex. 100px, 100%, auto etc.',
            table: {
                defaultValue: { summary: '16px' },
            },
            control: {
                type: 'text',
            },
        },
        textVariant: {
            description: 'Estilo do template skeleton',
            ctable: {
                defaultValue: { summary: 'text' },
            },
            control: { type: 'select', options: ['text', 'pill', 'rect'] },
        },
    },
};

export const Base = (args: any) => {
    return (
        <div style={{ width: '90%' }}>
            <apollo-template-skeleton
                {...args}
                text-count={args.textCount}
                text-height={args.textHeight}
                text-variant={args.textVariant}
                show-warnings={args.showWarnings}
                avatar-size={args.avatarSize}
            ></apollo-template-skeleton>
        </div>
    );
};

Base.args = {
    textCount: '3',
    showWarnings: 'true',
};
