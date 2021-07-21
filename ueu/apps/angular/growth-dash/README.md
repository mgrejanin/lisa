# Growth-dash

Growthdash é um painel de gerenciamento de promoções. O objetivo é servir como uma ferramenta fácil que de recursos ao Growth para engajar um usuário final através de promoções que possam ser ofertadas.

## Como contribuir

Todas as orientações relacionadas a contribuição podem ser encontradas no readme principal do monorepo, pois todos os projetos seguem um único padrão.

Acesse a seção [Como colaborar](/README.md#como-colaborar) do monorepo para mais detalhes.

## Guia de desenvolvimento

Seguimos alguns padrões de desenvolvimento no painel de growth-dash, sendo eles:

-   Padrão de criação de branchs e mensagens de commit, veja com mais detalhes em [Como colaborar](/README.md#como-colaborar).

-   Padrão de criação de classes `HTML e CSS` [BEM](https://desenvolvimentoparaweb.com/css/bem/).

-   Padrões e regras TSLINT e PRETTIER, veja com mais detalhes em [Padrão de Código](https://picpay.atlassian.net/wiki/spaces/FRONT/pages/452952415/Padr+o+de+C+digo+Code+Style).

-   Padrão de nomenclatura de arquivos, veja com mais detalhes em [Nomenclatura de Arquivos - SPA](https://picpay.atlassian.net/wiki/spaces/FRONT/pages/546439215/Nomenclatura+de+Arquivos+-+SPA).

### Estrutura das bibliotecas página

-   A estrutura de pastas de uma lib página deve ser organizada da seguinte maneira:
    -   `components`: para agrupar todos os componentes particulares daquela página;
    -   `mocks`: usada para agregar todos os arquivos de mocks usamos em seus testes unitários;
    -   `models`: se a página possuir interfaces/enums/classes muito particulares que vão além do model implementado nos seus serviços;
    -   `state`: se a página possuir gerenciamento de estados (akita);
    -   `containers`: se a página necessitar de um componente intermediário entre seus componentes auxiliares (dumb components) e a página;
    -   `pages`: componente principal que representa a página (rota) agrupando todos os seus containers (se houver) e componentes auxiliares (dumb components);

## Autenticação

-   O login do painel growth-dash utiliza a lib [`Keycloak`](/libs/packages/keycloak/README.md);
