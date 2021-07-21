import { StaticMenuItem } from '../models/static-menu-item.model';

const staticMenuItems = {
    assinaturas: [
        {
            title: 'Introdução',
            items: [
                {
                    title: 'O que é?',
                    id: 'o-que-e',
                },
                {
                    title: 'Como assinar?',
                    id: 'como-assinar',
                },
            ],
        },
    ],
    b2p: [
        {
            title: 'Introdução',
            items: [
                {
                    title: 'O que é?',
                    id: 'o-que-e',
                },
                {
                    title: 'Comece a usar',
                    id: 'comece-a-usar',
                },
                {
                    title: 'Tarifa',
                    id: 'tarifa',
                },
            ],
        },
    ],
    'e-commerce': [
        {
            title: 'Introdução',
            items: [
                {
                    title: 'Visão geral',
                    id: 'visao-geral',
                },
                {
                    title: 'Taxas',
                    id: 'taxas',
                },
                {
                    title: 'Funcionalidades disponíveis',
                    id: 'funcionalidades-disponiveis',
                },
            ],
        },
        {
            title: 'Como começar?',
            items: [
                {
                    title: 'Antes de começar',
                    id: 'antes-de-comecar',
                },
                {
                    title: 'Opções de integração',
                    id: 'opcoes-de-integracao',
                },
                {
                    title: 'Testando sua integração',
                    id: 'testando-sua-integracao',
                },
            ],
        },
        {
            title: 'Guias da API pública',
            items: [
                {
                    title: 'Aceitando pagamentos com a API pública',
                    id: 'aceitando-pagamento',
                },
                {
                    title: 'Como funciona?',
                    id: 'como-funciona-api',
                },
                {
                    title: 'Autenticação',
                    id: 'autenticacao-api',
                },
                {
                    title: 'Funcionamento básico',
                    id: 'funcionamento-basico-api',
                },
            ],
        },
        {
            title: 'Consultando o status dos pagamentos',
            items: [
                {
                    title: 'Consultando o status dos pagamentos',
                    id: 'consultando-status-pagemento',
                },
                {
                    title: 'Autenticação',
                    id: 'autenticacao-pagamento',
                },
                {
                    title: 'Funcionamento básico',
                    id: 'funcionamento-basico-pagamento',
                },
                {
                    title: 'Ciclo de vida de um pagamento',
                    id: 'ciclo-de-vida-de-um-pagamento',
                },
            ],
        },
        {
            title: 'Solicitando cancelamentos',
            items: [
                {
                    title: 'Solicitando cancelamentos',
                    id: 'solicitando-cancelamentos',
                },
                {
                    title: 'Autenticação',
                    id: 'autenticacao-cancelamento',
                },
                {
                    title: 'Funcionamento básico',
                    id: 'funcionamento-basico-cancelamento',
                },
            ],
        },
        {
            title: 'Gerenciar notificações',
            items: [
                {
                    title: 'Como funciona?',
                    id: 'gerenciar-notificacoes',
                },
                {
                    title: 'Autenticação',
                    id: 'autenticacao-notificacoes',
                },
                {
                    title: 'Funcionamento básico',
                    id: 'funcionamento-basico-notificacoes',
                },
                {
                    title: 'Situações de notificação',
                    id: 'situacoes-de-notificacao',
                },
            ],
        },
        {
            title: 'Recursos',
            items: [
                {
                    title: 'Postman',
                    id: 'postman',
                },
                {
                    title: 'Obtendo ajuda',
                    id: 'obtendo-ajuda',
                },
            ],
        },
    ],
    'plataforma-aberta': [
        {
            title: 'Introdução',
            items: [
                {
                    id: 'estrutura-de-customizacao',
                    title: 'Estrutura de costumização',
                },
                {
                    id: 'modulos',
                    title: 'Módulos',
                },
                {
                    id: 'fluxos-de-navegacao',
                    title: 'Fluxos de Navegação',
                },
                {
                    id: 'componentes-personalizaveis',
                    title: 'Componentes Personalizáveis',
                },
                {
                    id: 'banner-header',
                    title: 'Banner Header',
                },
                {
                    id: 'texto',
                    title: 'Texto',
                },
                {
                    id: 'botao',
                    title: 'Botão',
                },
                {
                    id: 'lista',
                    title: 'Lista',
                },
                {
                    id: 'actions',
                    title: 'Actions',
                },
                {
                    id: 'webview',
                    title: 'Webview',
                },
                {
                    id: 'webhook',
                    title: 'Webhook',
                },
            ],
        },
    ],
};

/**
 * Returns the static menu items based on the product slug
 * @param slug must be the exact same string that comes from the product webservice
 */
export const getMenuItemsBySlug = (slug: string): StaticMenuItem[] => staticMenuItems[slug];
