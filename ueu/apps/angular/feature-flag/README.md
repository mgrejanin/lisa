# Feature Flag - Houston

O propósito da aplicação é permitir a mudança do comportamento de nossas soluções sem a necessidade de alteração do código.

## Guia de desenvolvimento

TO DO

### Estrutura das bibliotecas Página

TO DO

### Serviços

TO DO

### Autenticação

TO DO

### Bibliotecas auxiliares

TO DO

## Como contribuir

Todas as orientações relacionadas a contribuição podem ser encontradas no readme principal do monorepo, pois todos os projetos seguem um único padrão.

Acesse a seção [Como colaborar](/README.md#como-colaborar) do monorepo para mais detalhes.

## Guia de desenvolvimento

Seguimos alguns padrões de desenvolvimento no painel de vendas, sendo eles:

-   Padrão de criação de branchs e mensagens de commit, veja com mais detalhes em [Como colaborar](/README.md#como-colaborar).

-   Padrão de criação de classes `HTML e CSS` [BEM](https://desenvolvimentoparaweb.com/css/bem/).

-   Padrões e regras TSLINT e PRETTIER, veja com mais detalhes em [Padrão de Código](https://picpay.atlassian.net/wiki/spaces/FRONT/pages/452952415/Padr+o+de+C+digo+Code+Style).

-   Padrão de nomenclatura de arquivos, veja com mais detalhes em [Nomenclatura de Arquivos - SPA](https://picpay.atlassian.net/wiki/spaces/FRONT/pages/546439215/Nomenclatura+de+Arquivos+-+SPA).

Atualmente seguimos a meta de manter o <i>painel de vendas</i> com a porcentagem de cobertura de testes unitários acima de 90%. Siga o passo a passo para testar serviços utilizando um mock para a apiUrl:

Importe o `CoreDataAccessService` da lib Shared.

```
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
```

No primeiro `beforeEach` do seu arquivo <b>SPEC</b>, em `providers` acrescente o `CoreDataAccessService` com a seguinte configuração:

```
{
    provide: CoreDataAccessService,
    useValue: {
        getConfig: () => ({ apiUrl: 'url-test.com' }),
    },
}
```

Pensando na perfomance e melhoria na produção de cada desenvolvedor, temos alguns conceitos sobre `Clean code` como a criação coerente de variáveis, métodos e comentários.

Para mais detalhes sobre Clean Code e SOLID, consulte essa [documentação](https://github.com/ryanmcdermott/clean-code-javascript).

# Páginas

TO DO
