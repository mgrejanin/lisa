[![Codacy Badge](https://app.codacy.com/project/badge/Grade/5b6144e0fbc348f0b41e719e19a09a5d)](https://www.codacy.com?utm_source=github.com&utm_medium=referral&utm_content=PicPay/picpay-frontend&utm_campaign=Badge_Grade)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)]()
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# 🏆 PicPay Frontend 🥇

Monorepo para projetos frontend utilizando

-   Angular 11 (CLI 12.0.4)
-   NX (Workspace 12.3.6)
-   StencilJS (Core 2.3.0)
-   Akita - Reactive State Management
-   Jest - JavaScript Testing Framework
-   Cypress - JavaScript End to End Testing Framework
-   Storybook - Tools for UI components
-   React - JavaScript library for building user interfaces
-   NextJS - Hybrid static & server rendering Framework

## Lista de apps

| APP               | DESCRIÇÃO                                                 |
| ----------------- | --------------------------------------------------------- |
| `seller-panel`    | Painel lojista                                            |
| `seller-register` | Cadastro Web (Empresas)                                   |
| `feature-flag`    | Feature Management                                        |
| `ops-dash`        | DevOps Dashboard                                          |
| `design-system`   | Storybook Design System Web Components + Angular + React  |
| `lab-components`  | Storybook PicPay Labs Web Components + Angular            |
| `finance-dash`    | Painel Financeiro                                         |
| `dev-portal`      | PicPay Studio: Portal de Desenvolvedor                    |
| `picpedia`        | Plataforma de descoberta de Dados                         |
| `picpay-lab`      | Painel de gerenciamento de stores                         |
| `website`         | Website e páginas estáticas do site principal             |
| `webview`         | Webview que são inseridas e renderizadas nos Apps nativos |
| `growth-dash`     | Painel de gerenciamento de campanhas                      |

## Lista de libs

| LIB                      | DESCRIÇÃO                                                                                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `design-system`          | Lib de Web Components Vanilla do Design System (StencilJS)                                                                   |
| `design-system-angular`  | Módulo de componentes de Design System do Angular                                                                            |
| `design-system-react`    | Lib de componentes React do Design System                                                                                    |
| `lab-components`         | Lib de Web Components Vanilla do PicPay Labs (StencilJS)                                                                     |
| `lab-components-angular` | Módulo de componentes de PicPay Labs do Angular                                                                              |
| `event-tracking`         | Lib de traqueamento de eventos                                                                                               |
| `features-flag`          | Lib de feature flag                                                                                                          |
| `keycloak`               | Lib de autenticação e autorização                                                                                            |
| `design-system-tokens`   | Transforma todos os design tokens definido pelo time de Designers em propriedades que possam ser consumidas dentro do código |
| `sass-functions`         | Injeta uma função `theme` para ser utilizada em arquivos sass (.scss)                                                        |
| `stencil-sass`           | Pré-compila arquivos SASS dentro dos componentes Stencil                                                                     |

---

## Cobertura de testes (v2.1.0)

| Coverage summary | %                    |
| ---------------- | -------------------- |
| Statements       | 92.93% ( 5612/6039 ) |
| Branches         | 74.57% ( 1044/1400 ) |
| Functions        | 90.36% ( 1322/1463 ) |
| Lines            | 92.69% ( 4948/5338 ) |

## Configurações iniciais

> 💡 Garanta que seu Node esteja na versão 12.14.1 ou superior, e Yarn na 1.22.10 ou superior, para uma melhor compatibilidade e integração

Para ter acesso aos repositórios privados do PicPay é necessário ter um token configurado no seu `.npmrc` global, que geralmente fica no diretório raiz do seu usuário, por exemplo, `~/.npmrc` <br>
Para isso, acesse a página:
[Tokens pessoais do GitHub](https://github.com/settings/tokens?target=_blank) e gere um novo token

Por questões de segurança é recomendado usar somente as roles: <strong>public_repo, read:packages, repo:status, write:packages</strong>

Execute o comando alterando o texto `TOKEN_GERADO` pelo token gerado pelo GitHub

```shell
echo "registry=https://npm.pkg.github.com/PicPay " > ~/.npmrc && echo "//npm.pkg.github.com/:_authToken=TOKEN_GERADO" >> ~/.npmrc
```

Na raiz do repositório execute o comando

```shell
yarn install
```

Para subir o servidor de desenvolvimento local, cada projeto tem um comando específico, por exemplo:

```shell
nx serve <projeto>
```

Cada projeto tem uma porta/endereço única que estão listadas abaixo

## Links

| PROJETO           | QA                                      | PROD                              |
| ----------------- | --------------------------------------- | --------------------------------- |
| `ops-dash`        | `ops-dash.ms.qa.limbo.work`             | `ops-dash.limbo.work`             |
| `seller-panel`    | `seller-panel.ms.qa.limbo.work`         | `seller-panel.limbo.work`         |
| `feature-flag`    | `feature-flag.ms.qa.limbo.work`         | `feature-flag.limbo.work`         |
| `design-system`   | `design-system-web.ms.qa.limbo.work`    | `design-system-web.limbo.work`    |
| `lab-components`  | `lab-components.ms.qa.limbo.work`       | `lab-components.limbo.work`       |
| `finance-dash`    | `financedash.ms.qa.limbo.work`          | `financedash.limbo.work`          |
| `dev-portal`      | `dev-portal.ms.qa.limbo.work`           | `dev-portal.limbo.work`           |
| `seller-register` | `sellerpanel.ms.qa.limbo.work/registro` | `sellerpanel.limbo.work/registro` |
| `picpedia`        | `picpedia.ms.qa.limbo.work`             | `picpedia.limbo.work`             |
| `website`         | `website.ms.qa.limbo.work`              | `website.limbo.work`              |
| `webview`         | `webview.ms.qa.limbo.work`              | `webview.limbo.work`              |
| `growth-dash`     | `growthdash.ms.qa.limbo.work`           | `growthdash.limbo.work`           |

---

## Lista de pacotes

| LIB                      | CAMINHO                          |
| ------------------------ | -------------------------------- |
| `design-system`          | `@picpay/design-system/loader`   |
| `design-system-angular`  | `@picpay/design-system-angular`  |
| `design-system-react`    | `@picpay/design-system-react`    |
| `lab-components`         | `@picpay/lab-components/loader`  |
| `lab-components-angular` | `@picpay/lab-components-angular` |
| `event-tracking`         | `@picpay/event-tracking`         |
| `features-flag`          | `@picpay/feature-flag`           |
| `keycloak`               | `@picpay/keycloak`               |

---

## Como colaborar

Guia para criar uma branch no monorepo: [Como criar branch no monorepo?](https://github.com/PicPay/picpay-frontend/wiki/Como-criar-branch-no-monorepo)

Guia para commitar no monorepo: [Como commitar no monorepo?](https://github.com/PicPay/picpay-frontend/wiki/Como-commitar-no-monorepo)

---

## Comandos úteis

Todos os comandos rodam no NX CLI instalado no workspace.

Caso esteja com algum problema com o comando local você pode acionar pelo `npx`

| COMANDO           | DESCRIÇÃO                                                                                             |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| `serve`           | Serve a aplicação em modo desenvolvimento na porta `4200`                                             |
| `build`           | Faz o build da aplicação ou biblioteca - [+ detalhes](https://github.com/PicPay/picpay-frontend/wiki) |
| `test`            | Executa os testes unitários do projeto                                                                |
| `e2e`             | Executa os testes ponta-a-ponta do projeto                                                            |
| `storybook`       | Serve a documentação técnica do projeto na porta `4400`                                               |
| `build-storybook` | Faz o build de produção da documentação técnica do projeto                                            |
| `export`          | Otimiza o build do NextJS para SSG - [+ detalhes](https://github.com/PicPay/picpay-frontend/wiki)     |
| `serve-scully`    | Serve a aplicação estática baseada em Scully em modo desenvolvimento na porta `1668`                  |
| `build-scully`    | Otimiza o build da aplicação para SSG - [+ detalhes](https://github.com/PicPay/picpay-frontend/wiki)  |
| `run-many`        | Executa um comando numa lista de projetos ou em todos                                                 |
| `affected`        | Executa algum comando somente se sua alteração teve algum impacto naquele projeto                     |
| `dep-graph`       | Gera o gráfico de dependências interativo do repositório                                              |

### Exemplos

Serve a aplicação em modo desenvolvimento na porta `4200`

```shell
nx serve <nome do projeto>
```

Executa os testes unitários do projeto

```shell
nx test <nome do projeto>
```

Executa todos os testes unitários do repositório

```shell
nx run-many --target=test --all
```

Executa o comando de LINT somente nos projetos afetados pela sua modificação local

```shell
nx affected:lint
```

Executa o comando de Build somente nos projetos afetados pela sua modificação local baseado em uma branch

```shell
nx affected:build --base=feat/core/other-branch
```

---

## Documentações

> Dúvidas? Temos uma [Wiki](https://github.com/PicPay/picpay-frontend/wiki) com uma série de documentações que podem te ajudar!

---

Esse repositório é nosso!!

Use sua criatividade e sinta-se a vontade para colaborar e fazer um PicPay cada vez melhor 💚
