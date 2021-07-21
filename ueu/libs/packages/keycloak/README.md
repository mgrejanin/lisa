# Porque o Keycloak

Hoje, no PicPay temos um problema muito grande de gerenciamento de acesso. Cada vez que um novo colaborador chega, ele tem que solicitar o acesso pra cada um dos painéis com que vai trabalhar, e da mesma forma, a equipe responsável concede acesso painel por painel, pois cada um utiliza uma base diferente. O Keycloak é uma solução de gerenciamento de identidade e acesso de código aberto voltada para aplicativos e serviços modernos da Red Hat. Torna mais fácil proteger aplicativos e serviços com pouco ou nenhum código. Utilizando o Keycloak como uma solução de SSO, resolveríamos o problema da descentralização de acessos e passaríamos a tratar os acessos através de roles, que podem ser atribuídas aos usuários existentes. O Keycloak suporta a integração com provedores de identidade, como o G Suite. Sendo assim, assumindo que um determinado usuário existe no G Suite, já estará apto a acessar qualquer painel que utilize o Keycloak. Esse documento visa especificar o funcionamento e a implementação do Keycloak em projetos Angular.

# Fluxogramas de funcionamento do Keycloak:

-   Diagrama de sequência

![Diagrama de sequência](https://github.com/PicPay/picpay-frontend/blob/develop/libs/packages/keycloak/src/docs/diagrama_de_sequencia.png)

-   Fluxo de autenticação de usuário:

![Fluxograma de autenticação de usuários](https://github.com/PicPay/picpay-frontend/blob/develop/libs/packages/keycloak/src/docs/diagrama_de_fluxo_auth.png)

-   Fluxo de autenticação de rotas

![Fluxograma de autenticação de rotas](https://github.com/PicPay/picpay-frontend/blob/develop/libs/packages/keycloak/src/docs/diagrama_de_fluxo_route_auth.png)

-   Fluxo de autenticação de API’s

![Fluxograma de autenticação de API's](https://github.com/PicPay/picpay-frontend/blob/develop/libs/packages/keycloak/src/docs/diagrama_de_fuxo_api_auth.png)

# Implementação em projetos Angular

Para nos auxiliar com esse processo, iremos utilizar a lib [keycloak-angular](https://www.npmjs.com/package/keycloak-angular) que é uma adaptação em torno da lib [keycloak-js](https://www.npmjs.com/package/keycloak-js) que é do próprio Keycloak.

## Inicialização

Para iniciar o Keycloak na aplicação, a primeira coisa a fazer é criar uma constante tipada com a interface [PicpayKeycloakConfig](https://github.com/PicPay/picpay-frontend/blob/develop/libs/packages/keycloak/src/lib/picpay-keycloak.config.ts), e importar o módulo [PicpayKeycloakModule](https://github.com/PicPay/picpay-frontend/blob/develop/libs/packages/keycloak/src/lib/picpay-keycloak.module.ts) no `AppModule` da sua aplicação. Use o código abaixo como exemplo.

```typescript
import { PicpayKeycloakConfig, PicpayKeycloakModule } from '@picpay/keycloak';

const keycloakConfig: PicpayKeycloakConfig = {
    clientId: environment.clientId,
    realm: environment.realm,
    url: environment.keycloakUrl,
    onLoad: 'login-required',
    notAllowedRouteRedirectTo: '/error/not-authorized',
    loadUserProfileAtStartUp: true
};

@NgModule({
    ...
    imports: [
        PicpayKeycloakModule.forRoot(keycloakConfig),
        ...
    ],
})
...
```

As propriedades `clientId`, `realm` e `url`são referentes a configuração do seu projeto no Keycloak.

A propriedade `onLoad` define a forma que o Keycloak será iniciado, podendo variar entre `login-required` e `check-sso`. No exemplo acima, usando `login-required`, o keycloak só permitirá que o usuário acesse a aplicação após a autenticação. O usuário que tentar acessar a apicação sem estar autenticado será redirecionado para a tela de login do Keycloak. E para garantir que essa regra irá funcionar da devida forma, é necessário adicionar a propriedade `initialNavigation` com valor `'disabled'` no `AppRoutingModule` da aplicação, conforme exemplo abaixo:

```ts
@NgModule({
    imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', initialNavigation: 'disabled' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
```

Usando `check-sso`, o Keycloak, através de um iframe irá apenas checar se o usuário está autenticado. A opção `check-sso` deve ser usada apenas quando o projeto não for totalmente autenticado.

A propriedade `notAllowedRouteRedirectTo` define a rota para onde o usuário será redirecionado caso ele esteja autenticado e tente acessar uma rota ao qual ele não tenha acesso, conforme o diagrama de fluxo de autenticação de rotas acima. No monorepo, nós temos a lib [SharedDefaultScreens](https://github.com/PicPay/picpay-frontend/blob/develop/libs/angular/shared/default-screens/README.md) que é focada em centralizar telas que podem ser reaproveitadas. No exemplo acima, o usuário seria redirecionado para a rota `/error/not-authorized`. Adicionando a configuração abaixo às configurações de rota da sua aplicação, seria possível utilizar a tela de acesso não autorizada que já está pronta nesta lib.

A proprieade `loadUserProfileAtStartUp` define se os dados do usuário serão carregados ou não no momento do login. Por default, esse paramêtro é `true`. **IMPORTANTE: Esse paramêtro só fará efeito caso o método de inicialização usado for `login-required`. Caso contrário as informações do usuário terão de ser carregadas através do método `loadUserProfile`.**

```ts
const routes: Routes = [
    ...,
    {
        path: 'error',
        loadChildren: () => import('@picpay/angular/shared/default-screens').then(module => module.SharedDefaultScreensModule),
    }
];
```

Após isso criar a constante e importar o módulo, é necessário incluir a seguinte entrada no `project.config.json` da sua aplicação, em `angular -> nome-do-projeto -> architect -> build -> options -> assets`:

```json
{
    "glob": "**/*",
    "input": "libs/packages/keycloak/src/assets",
    "output": "./assets/keycloak"
}
```

### Inicialização em projetos que não estão no monorepo:

Primeiramente, você deverá instalar a nossa lib, usando o comando abaixo:

```sh
yarn add @picpay/keycloak
```

Para garantir que o Keycloak possa se comunicar por meio do iframe, caso o método de inicilização usado seja o `check-sso`, você terá que adicionar um HTML estático à sua aplicação. Para isso, inclua a seguinte entrada no `angular.json` da sua aplicação, em `projects -> nome-do-projeto -> architect -> build -> options -> assets`:

```ts
{
    "glob": "**/*",
    "input": "node_modules/@PicPay/keycloak/src/assets",
    "output": "./assets/keycloak"
}
```

### Desativando a navegação inicial automática do Angular

Para completar a configuração inicial do Keycloak, temos que desativar a navegação inicial automática do Angular. Para isso, basta adicionar a flag `initialNavigation` com valor `'disabled'` nas configurações do `RouterModule` no `AppModule` da sua aplicação, conforme exemplo abaixo:

```ts
...
@NgModule({
    imports: [RouterModule.forRoot(routes, { initialNavigation: 'disabled' })],
    ...
})
...
```

Com isso, o Keycloak já estará devidamente iniciado.

## Obtendo informações do usuário

Se você utilizou `login-required` como método de inicialização, você pode obter as informações do usuário de forma estática através do método `getUserProfile`, caso contrário, utilize o método `loadUserProfile`.

## Callback pós inicialização

Caso seja necessário, é possível adicionar um callback ao Keycloak. Esse Callback será executado imediatamente após a inicialização do keycloak. Para incluir um callback, são necessárias duas etapas:

1. Criar uma classe que implemente a interface `PicpayKeycloakCallback`:

```ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PicpayKeycloakCallback } from '@PicPay/keycloak';
import { Observable } from 'rxjs';

@Injectable()
export class KeycloakCallback implements PicpayKeycloakCallback {
    constructor(private http: HttpClient) {}

    callback(): Observable<any> {
        return this.http.get('https://run.mocky.io/v3/71f5be38-bed3-4649-9587-41992539c802');
    }
}
```

2. Incluir a propriedade `withCallback` nas configs do keycloak, e adicionar o injection token `PicpayKeycloakConfigService` no AppModule da aplicação, usando a classe criada:

```typescript
import { PicpayKeycloakConfig, PicpayKeycloakModule, PicpayKeycloakCallbackService } from '@picpay/keycloak';

const keycloakConfig: PicpayKeycloakConfig = {
    clientId: environment.clientId,
    realm: environment.realm,
    url: environment.keycloakUrl,
    onLoad: 'login-required',
    notAllowedRouteRedirectTo: '/error/not-authorized',
    withCallback: true
};

@NgModule({
    ...
    imports: [
        PicpayKeycloakModule.forRoot(keycloakConfig),
        ...
    ],
    providers: [
       { provide: PicpayKeycloakCallbackService, useClass: KeycloakCallback },
        ...
  ],
})
...
```

## Autenticação de rotas

A nossa lib do keycloak também já conta com um Guard pronto. Ele utilizará as roles atribuidas ao usuário e as roles informadas nas configs da rota para determinar se o usuário tem ou não acesso à rota solicitada. Conforme o exemplo abaixo, adicione na rota o Guard utilizando o devido método (`canActivate`, `canActivateChild` ou `canLoad`) e as roles que o usuário deve ter para acessar a rota.

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PicpayKeycloakGuard } from '@picpay/keycloak';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [PicpayKeycloakGuard],
        data: { roles: ['home', 'viewer'] },
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { initialNavigation: 'disabled' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
```

No código acima, o usuário deverá ter as roles `home` e `viewer` atribuídas para poder acessar a rota `home`, e o `AuthGuard` acima já irá fazer essa validação.

## HttpInterceptor

Ao importar o `KeycloakAngularModule` no `AppModule` da sua aplicação, por padrão, todas as requets feitas com HttpClient adicionarão o cabeçalho Authorization, no formato: `Authorization: Bearer TOKEN`.

# Projetos de exemplo:

-   [Feature-flag (dentro do monorepo)](https://github.com/PicPay/picpay-frontend/tree/feat/shared/keycloak-example/apps/feature-flag)

-   [Projeto fora do monorepo](https://github.com/PicPay/picpay-front-pocs/tree/master/keycloak-poc)
