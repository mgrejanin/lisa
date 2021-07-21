# Painel Ops-dash

O painel ops-dash tem como objetivo tornar o dia a dia do dev e devops do picpay cada vez mais prático.
Nele é possível cadastrar e gerenciar variáveis de ambiente e serviços associados à variável de ambiente.

## Guia de desenvolvimento

Além de seguirmos todo o padrão global determinado pelo monorepo (testes unitários, clean code, akita, bem, lint, prettier, pre commit, pre push, etc), temos algumas particularidades no desenvolvimento do painel.

### Estrutura das bibliotecas página

-   A estrutura de pastas de uma lib página deve ser organizada da seguinte maneira:
    -   `components`: para agrupar todos os componentes particulares daquela página;
    -   `mocks`: usada para agregar todos os arquivos de mocks usamos em seus testes unitários;
    -   `models`: se a página possuir interfaces/enums/classes muito particulares que vão além do model implementado nos seus serviços;
    -   `state`: se a página possuir gerenciamento de estados (akita);
    -   `containers`: se a página necessitar de um componente intermediário entre seus componentes auxiliares (dumb components) e a página;
    -   `pages`: componente principal que representa a página (rota) agrupando todos os seus containers (se houver) e componentes auxiliares (dumb components);

### Componentes

-   Temos como padrão de implementação de todos os componentes a utilização dos componentes provido pelo nosso Design System;

-   Utilizamos o padrão [BEM](https://desenvolvimentoparaweb.com/css/bem/) (Block Element Modifier) em SCSS para estilização;

-   Todas as classes de componentes devem ter o prefixo `c` para representar um componente. Exemplo: `c-variables` representa a classe principal do componente [`VariablesHomeComponent`](/libs/angular/ops-dash/variables/src/lib/pages/variables/variables.component.scss);

### Autenticação

-   O login do painel ops-dash utiliza a lib keycloak [`PicpayKeycloakGuard`](/libs/packages/keycloak/README.md);

## Como contribuir

Todas as orientações relacionadas a contribuição podem ser encontradas no readme principal do monorepo, pois todos os projetos seguem um único padrão.

Acesse a seção [Como colaborar](/README.md#como-colaborar) do monorepo para mais detalhes.

## Guia de desenvolvimento

Seguimos alguns padrões de desenvolvimento no painel de ops-dash, sendo eles:

-   Padrão de criação de branchs e mensagens de commit, veja com mais detalhes em [Como colaborar](/README.md#como-colaborar).

-   Padrão de criação de classes `HTML e CSS` [BEM](https://desenvolvimentoparaweb.com/css/bem/).

-   Padrões e regras TSLINT e PRETTIER, veja com mais detalhes em [Padrão de Código](https://picpay.atlassian.net/wiki/spaces/FRONT/pages/452952415/Padr+o+de+C+digo+Code+Style).

-   Padrão de nomenclatura de arquivos, veja com mais detalhes em [Nomenclatura de Arquivos - SPA](https://picpay.atlassian.net/wiki/spaces/FRONT/pages/546439215/Nomenclatura+de+Arquivos+-+SPA).
