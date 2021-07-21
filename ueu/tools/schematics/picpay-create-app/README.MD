## SCHEMATICS - CRIAÇÃO DE APP

Este schematic visa automatizar o processo de criação de app dentro do monorepo.

## Executando o schematic

Para executar o schematics, no terminal, digite o seguinte comando:

```sh
npx nx workspace-schematic picpay-create-app
```

Em seguida, serão feitas 3 perguntas:

-   **Qual o nome da aplicação?** -> Digite o nome da aplicação usando camelCase. Exemplo: sellerPanel, featureFlag, opsDash.

**Para as perguntas abaixo, caso a resposta seja sim, apenas tecle `Enter` para responder. Caso a resposta seja não, tecle `N` e depois `Enter`**

-   **Deseja adicionar sso na aplicação?** -> Irá adicionar o módulo do [Keycloak](https://github.com/PicPay/picpay-frontend/wiki/Keycloak-Modelo-de-integra%C3%A7%C3%A3o) à sua aplicação.

-   **Se sua aplicação precisa de SSO, ela será 100% autenticada?** -> Existe a possibilidade de sua aplicação necesstiar de autenticação porém, em apenas algumas rotas. Nesse caso a autenticação não será obrigatória. Caso a autenticação seja obrigatória na sua aplicação, será adicionada uma regra que só irá carregar a rota inicial da aplicação quando o usuário já estiver autenticado. Caso contrário, ele será direcionado para a página de login do Keycloak.

-   **Deseja adicionar gerenciamento de estado na aplicação?** -> Irá adicionar a lib [Akita](https://datorama.github.io/akita/) à sua aplicação.

-   **Sua aplicação é um dashboard?** -> Irá adicionar as configurações necessárias para que sua aplicação tenha o layout padrão de dashboards, conforme exemplo abaixo:

<img src="https://github.com/PicPay/picpay-frontend/blob/dcd6222ddba485aed0ac2eea1c112897296f123a/tools/schematics/picpay-create-app/docs/layout_default_example.png">

Após responder as perguntas, o schematics irá executar alguns comandos, conforme descrito a seguir:

1. Executa o comando para a criação do app em si (`ng new`).
2. Remove os arquivos que serão substituídos por templates;
3. Os templates que ficarão no lugar dos arquivos que foram removidos contém blocos de código que serão preenchidos dinâmicamente. Esse step faz o preenchimento desses blocos de acordo com as respostas das perguntas e os coloca no lugar dos arquivos removidos.
4. Executa o `yarn install`.

A execução do schematics estará concluída quando aparecer a seguinte mensagem no terminal.

```sh
✔ Packages installed successfully.
```

## Templates

A intenção desta seção é listar e explicar os templates que são usados no lugar dos arquivos originais.

-   #### app.component.html

    -   O `app.component.html` gerado pelo Nx traz um template com várias informações sobre o produto deles e óbviamente isso não é interessante para nós. Então nesse, todo esse conteúdo é substiuído por um simples `<router-outlet></router-outlet>`.

-   #### app.component.scss

    -   Este arquivo traz o CSS do template do Nx. Ele é substituído por um arquivo em branco.

-   #### app.component.spec.ts

    -   Neste caso, nós usamos um template bem similar ao tempalte padrão gerado pelo Angular, só com a adição do `async/await` no método `beforeEach`. Fazemos isso para atender a regra [no-floating-promises](https://palantir.github.io/tslint/rules/no-floating-promises/) do nosso TSLint.

-   #### app.module.ts

    -   Neste template, nós adicionamos por padrão aos imports, os módulos `BrowserAnimationsModule`, `BrowserModule`, `HttpClientModule`, [CoreDataAccessModule](https://github.com/PicPay/picpay-frontend/blob/master/libs/angular/shared/core/data-access/README.md), [DesignSystemAngularModule](https://github.com/PicPay/picpay-frontend/blob/master/libs/design-system/angular/README.md),
        [CoreNotificationsModule](https://github.com/PicPay/picpay-frontend/blob/master/libs/angular/shared/core/notifications/README.md), e dinâmicamente adicionamos os seguitnes módulos:
        -   SSO: Se sua aplicação irá utilizar SSO, iremos adicionar o módulo [PicpayKeycloakModule](https://github.com/PicPay/picpay-frontend/wiki/Keycloak-Modelo-de-integra%C3%A7%C3%A3o#inicializa%C3%A7%C3%A3o);
        -   Gerencimaneto de estado: Se sua aplicação irá utilizar gerencimanento de estado, iremos adicionar uma regra que valida se o projeto está sendo executado em dev ou prod, e se estiver sendo executado em prod, adiciona o módulo [AkitaNgDevtools](https://datorama.github.io/akita/docs/enhancers/devtools/);
        -   dashboard layout: Se sua aplicação irá utilizar layout padrão de dashboard, iremos adicionar o módulo [CommonLayoutsModule](https://github.com/PicPay/picpay-frontend/blob/develop/libs/ui/layouts/README.md).
    -   Além disso, iremos adicionar o service `NotificationsService` e o token `HTTP_INTERCEPTORS` usando a classe `ErrNotificationInterceptor` como providers, ambos do módulo [CoreNotifications](https://github.com/PicPay/picpay-frontend/blob/master/libs/angular/shared/core/notifications/README.md).

-   #### app.module.routing.ts

    -   Nesse template nós iremos criar e configurar as rotas de acordo com as dinâmicamente, de acordo com as respostas das perguntas:
        -   Se sua aplicação não irá utilizar SSO e não usar o layout padrão de dashboard, iremos manter a configuração de rota padrão do Angular.
        -   Se sua aplicação irá utilizar o layout padrão de dashboard, iremos adicionar uma rota `/home` usando como component o `LayoutDefaultComponent`. Também iremos adicionar o `LayoutsModule` na lista de imports.
        -   Se sua aplicação irá utilizar SSO, iremos adicionar a rota `/error` com lazy load do módulo [SharedDefaultScreens](https://github.com/PicPay/picpay-frontend/blob/develop/libs/angular/shared/default-screens/README.md). Caso sua aplicação também irá utilizar o layout padrão de dashboard, também iremos adicionar nesta rota como component o `LayoutDefaultComponent`.

-   #### environments

    -   Nos arquivos de environments, iremos adicionar por padrão a chave `apiUrl`. O valor dessa chave será o endereço da API da aplicação e será consumido pelo módulo [CoreDataAccess](https://github.com/PicPay/picpay-frontend/blob/master/libs/angular/shared/core/data-access/README.md).
    -   Se sua aplicação irá utilizar o SSO, serão adicionadas as chaves `keycloakClientId`,`keycloakRealm`,`keycloakUrl`. A explicação de como esse valores devem ser preenchidos está na [documentação do módulo do Keycloak](https://github.com/PicPay/picpay-frontend/wiki/Keycloak-Modelo-de-integra%C3%A7%C3%A3o).

-   #### app.layout.config.ts

    -   Se sua aplicação irá utilizar o layout padrão de dashboard, esse arquivo será adicionado à sua aplicação. Esse arquivo deve conter as configurações do layout padrão de dashboard que você irá utilizar. A explicação de como utilizar esse arquivo e as configurações está na [documentação do módulo CommonLayouts](https://github.com/PicPay/picpay-frontend/blob/develop/libs/ui/layouts/README.md).

-   #### project.config.json

    -   A explicação de como esse arquivo funciona está [nesta documentação](https://github.com/PicPay/picpay-frontend/wiki/Cria%C3%A7%C3%A3o-de-novos-projetos). Na execução do schematics, todo o processo documentado é feito automáticamente.

-   #### index.html

    -   Neste arquivo serão importadas via tag link as fontes padrão que usamos. Na tag body, para que nossos estilos funcionem da forma devida, será adicionada a classe `mat-typography` e o atributo `data-theme`.

-   #### main.ts

    -   Se sua aplicação irá utilizar o gerenciamento de estado, junto a chamada do método `enableProdMode` do Angular, iremos chamar o método `enableAkitaProdMode` da lib Akita. Além disso, iremos adicionar o a chama do método `persistState` da lib Akita. A explicação de como usar o `persistState` pode ser em sua própria [documentação](https://datorama.github.io/akita/docs/enhancers/persist-state/)

-   #### styles.scss
    -   Neste arquivo serão importados alguns mixins que irão padronizar os estilos da aplicação.
