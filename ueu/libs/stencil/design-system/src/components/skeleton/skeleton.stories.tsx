import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './skeleton.docs.mdx';

export default {
    title: 'Components/Skeleton',
    component: 'apollo-skeleton',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        animation: {
            description: 'Tipo de animação',
            table: {
                defaultValue: { summary: 'progress' },
            },
            control: { type: 'select', options: ['false', 'progress', 'progress-dark', 'pulse'] },
        },
        count: {
            description: 'Quantidade de skeletons a serem carregados',
            table: {
                defaultValue: { summary: '1' },
            },
            control: {
                type: 'number',
            },
        },
        customStyles: {
            description:
                'Custom css styles (background/margins/width/height etc.). Tipo: string | { [key: string]: string; }',
            table: {
                defaultValue: { summary: '{}' },
            },
            control: {
                type: 'text',
            },
        },
        height: {
            description: 'Altura do skeleton ex. 100px, 100%, auto etc.',
            table: {
                defaultValue: { summary: 'null' },
            },
            control: {
                type: 'text',
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
        size: {
            description: 'Tamanhos pré definidos, sobrescreve as propriedades width e height.',
            table: {
                defaultValue: { summary: 'null' },
            },
            control: { type: 'select', options: ['sm', 'md', 'lg', 'xlg', 'xxlg', 'xxxlg'] },
        },
        templateWidth: {
            description: 'Seleciona valores padrões de um template definido no CSS',
            table: {
                defaultValue: { summary: 'true' },
            },
            control: {
                type: 'boolean',
            },
        },
        variant: {
            description: 'Estilo do skeleton',
            ctable: {
                defaultValue: { summary: 'text' },
            },
            control: { type: 'select', options: ['text', 'circle', 'pill', 'rect'] },
        },
        width: {
            description: 'Largura do skeleton ex. 100px, 100%, auto etc.',
            table: {
                defaultValue: { summary: 'null' },
            },
            control: {
                type: 'text',
            },
        },
    },
};

export const Base = (args: any) => {
    return (
        <div style={{ width: '90%' }}>
            <apollo-skeleton
                {...args}
                custom-styles={args.customStyles}
                show-warnings={args.showWarnings}
                template-width={args.templateWidth}
            ></apollo-skeleton>
        </div>
    );
};

Base.args = {
    variant: 'text',
    width: '100%',
    height: '20px',
    templateWidth: 'true',
    showWarnings: 'true',
};

export const Variant = (args: any) => {
    return (
        <div style={{ width: '90%' }}>
            <apollo-skeleton {...args} variant="circle"></apollo-skeleton>
        </div>
    );
};

export const CustomStyles = (args: any) => {
    return (
        <div style={{ width: '90%' }}>
            <apollo-skeleton
                {...args}
                custom-styles={{ 'box-shadow': '0 2px 4px #ccc' }}
                variant="text"
            ></apollo-skeleton>
        </div>
    );
};
