import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './select.docs.mdx';

export default {
    title: 'Components/Select',
    component: 'apollo-select',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        disabled: {
            description: 'Habilita/Desabilita o estado desativado do componente',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: {
                type: 'boolean',
            },
        },
        helperPersist: {
            description: 'Quando verdadeiro fixa a exibição do texto de ajuda mesmo que o campo não esteja em foco',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: {
                type: 'boolean',
            },
        },
        helperText: {
            description: 'Texto de ajuda',
            table: {
                defaultValue: { summary: 'undefined' },
            },
            control: {
                type: 'text',
            },
        },
        id: {
            description: 'Id único do Select',
            table: {
                defaultValue: { summary: 'select__${this.rangeId}' },
            },
            control: {
                type: 'text',
            },
        },
        invalid: {
            description: 'Indica se o componente está inválido',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: {
                type: 'boolean',
            },
        },
        label: {
            description: 'Texto vinculado ao componente',
            table: {
                defaultValue: { summary: 'undefined' },
            },
            control: {
                type: 'text',
            },
        },
        'value-empty': {
            description: 'Option do select padrão com valor vazio',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: {
                type: 'boolean',
            },
        },
        leadingIcon: {
            description: 'Ícone localizado na parte esquerda',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: {
                type: 'boolean',
            },
        },
        name: {
            description: 'Nome do componente para agrupar select buttons em forms',
            table: {
                defaultValue: { summary: 'undefined' },
            },
            control: {
                type: 'text',
            },
        },
        noFloatingLabel: {
            description: 'Deixa o label apenas como placeholder',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: {
                type: 'boolean',
            },
        },
        required: {
            description: 'Marca o campo como obrigatório e adiciona um * no final do label/placeholder',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: {
                type: 'boolean',
            },
        },
        size: {
            description: 'Ajusta o tamanho em altura do componente: sm = 36px, md = 48px',
            table: {
                defaultValue: { summary: 'md' },
            },
            control: { type: 'select', options: ['sm', 'md'] },
        },
        success: {
            description: 'Habilita o estado válido do Select',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: {
                type: 'boolean',
            },
        },
        threshold: {
            description:
                'Para fins de performance o evento inputChange só é disparado em uma quantidade delimitada de tempo',
            table: {
                defaultValue: { summary: '200' },
            },
            control: {
                type: 'number',
            },
        },
        value: {
            description: 'Valor do componente',
            table: {
                defaultValue: { summary: 'undefined' },
            },
            control: {
                type: 'text',
            },
        },
        variant: {
            description: 'Estilo do Select',
            table: {
                defaultValue: { summary: 'outlined' },
            },
            control: { type: 'select', options: ['filled', 'outlined'] },
        },
    },
};

export const Base = (args: any) => {
    return (
        <div style={{ height: '200px' }}>
            <apollo-select
                {...args}
                no-floating-label={args.noFloatingLabel}
                leading-icon={args.leadingIcon}
                helper-persist={args.helperPersist}
                helper-text={args.helperText}
            >
                <apollo-select-item value="1">Item 1</apollo-select-item>
                <apollo-select-item value="2">Item 2</apollo-select-item>
                <apollo-select-item value="3">Item 3</apollo-select-item>
            </apollo-select>
        </div>
    );
};

Base.args = {
    label: 'PicPay Lovers',
};

export const Icon = (args: any) => {
    return (
        <div style={{ height: '200px' }}>
            <apollo-select
                {...args}
                no-floating-label={args.noFloatingLabel}
                helper-persist={args.helperPersist}
                helper-text={args.helperText}
                leading-icon
            >
                <apollo-select-icon slot="leading-icon">
                    <apollo-icon size="md" svg-icon="objects-heart"></apollo-icon>
                </apollo-select-icon>
                <apollo-select-item value="1">Item 1</apollo-select-item>
                <apollo-select-item value="2">Item 2</apollo-select-item>
                <apollo-select-item value="3">Item 3</apollo-select-item>
            </apollo-select>
        </div>
    );
};

Icon.args = {
    label: 'PicPay Lovers',
};

export const IconLeft = (args: any) => {
    return (
        <div style={{ height: '200px' }}>
            <apollo-select {...args} helper-persist={args.helperPersist} helper-text={args.helperText} leading-icon>
                <apollo-select-icon slot="leading-icon">
                    <apollo-icon size="md" svg-icon="objects-heart"></apollo-icon>
                </apollo-select-icon>
                <apollo-select-item value="1">
                    <apollo-icon slot="leading" size="md" svg-icon="objects-heart"></apollo-icon>
                    Primeiro
                </apollo-select-item>
                <apollo-select-item value="2">
                    <apollo-icon slot="leading" size="md" svg-icon="objects-heart"></apollo-icon>
                    Segundo
                </apollo-select-item>
                <apollo-select-item value="3">
                    <apollo-icon slot="leading" size="md" svg-icon="objects-heart"></apollo-icon>
                    Terceiro
                </apollo-select-item>
            </apollo-select>
        </div>
    );
};

IconLeft.args = {
    label: 'PicPay Lovers',
};

export const IconRight = (args: any) => {
    return (
        <div style={{ height: '200px' }}>
            <apollo-select {...args} leading-icon>
                <apollo-select-icon slot="leading-icon">
                    <apollo-icon size="md" svg-icon="objects-heart"></apollo-icon>
                </apollo-select-icon>
                <apollo-select-item value="1">
                    <apollo-icon slot="trailing" size="md" svg-icon="objects-heart"></apollo-icon>
                    Primeiro
                </apollo-select-item>
                <apollo-select-item value="2">
                    <apollo-icon slot="trailing" size="md" svg-icon="objects-heart"></apollo-icon>
                    Segundo
                </apollo-select-item>
                <apollo-select-item value="3">
                    <apollo-icon slot="trailing" size="md" svg-icon="objects-heart"></apollo-icon>
                    Terceiro
                </apollo-select-item>
            </apollo-select>
        </div>
    );
};

IconRight.args = {
    label: 'PicPay Lovers',
};

export const HelperText = (args: any) => {
    return (
        <div style={{ height: '200px' }}>
            <apollo-select
                {...args}
                no-floating-label={args.noFloatingLabel}
                leading-icon={args.leadingIcon}
                helper-text="This field is mandatory."
                helper-persist="true"
            >
                <apollo-select-item value="1">Item 1</apollo-select-item>
                <apollo-select-item value="2">Item 2</apollo-select-item>
                <apollo-select-item value="3">Item 3</apollo-select-item>
            </apollo-select>
        </div>
    );
};

HelperText.args = {
    label: 'PicPay Lovers',
};
