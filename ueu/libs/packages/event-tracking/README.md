## EVENT TRACKING

Esta é uma biblioteca agnóstica de framework, desenvolvida em Typescript e disponibilizada via Yarn que será responsavel por padronizar os envios de eventos para as plataformas de tracking de eventos que usamos internamente. Com ela não será mais necessário fazer todas as configurações para cada painel, isso será feito internamente pela biblioteca, com apoio de um backend, para decidir pra onde o evento será enviado e monitorado.

Fluxo de funcionamento do projeto de Event Tracking do PicPay:

![Fluxo de funcionamento](https://github.com/PicPay/picpay-frontend/blob/master/libs/packages/event-tracking/fluxo-eventracking.png)

## Manifesto de Event Tracking

Para escalarmos o uso de eventos temos que ter algumas regras. Essas regras vão nos ajudar manter uma linguagem comum, melhorando a comunicação e, consequentemente, reduzindo retrabalho. Além de como projetar os eventos, é importante também propormos um processo de alterações e implementação de novos eventos. Com isso surge o [**tracking plan**](https://picpay.atlassian.net/wiki/spaces/ET/pages/874124162/Manifesto+de+Event+Tracking), um documento que será compartilhado com diversas áreas que ajudará na comunicação de times com diferentes disciplinas.

É indispensável seguir os padrões propostos para se utilizar a biblioteca.

# Getting Started

### Instalacao

Se seu projeto já está dentro do monorepo, basta importar o EventTracking onde precisar.

```typescript
import { EventTracking } from '@picpay/event-tracking';
```

Caso seu projeto esteja fora do monorepo, instale a biblioteca via Yarn.

```typescript
yarn add @picpay/event-tracking
```

# Como inicializar a lib no seu projeto

A lib deve ser inicializada junto com a inicialização do projeto. Se o projeto for Angular, você deve fazer a inicialização no arquivo **main.ts**, importando a lib e chamando o método `init`, conforme exemplo abaixo:

```typescript
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { EventTracking, EventTrackingUserType } from '@picpay/event-tracking';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));

EventTracking.init({
    production: environment.production,
    userType: EventTrackingUserType.CONSUMER,
});
```

Você pode passar 3 parâmetros no `init`:

-   `production: boolean` -> Define o ambiente em que o projeto está sendo executado;
-   `userType: UserType` -> Define o tipo de usuário logado, podendo ser `UserType.SELLER` ou `UserType.CONSUMER`.
-   `userId: string` (opcional) -> Id do usuário logado. Pode ser definido posteriormente;

### Login

Como a lib será carregada antes do usuário ter oportunidade de logar na aplicação, você deve acionar a biblioteca quando o usuário fizer login. O mesmo deve ser feito caso haja uma ação de cadastro. Quando fizer login execute o método `login` para que o EventTracking possa fazer a associação da sessão com o usuário logado.

Exemplo de Login:

```typescript
loginCallback(userId: string): void {
    EventTracking.login(userId);
}
```

### Logout

Do mesmo modo que o método `login` é chamado no `login`, o método `logout` deve ser executado quando o usuario fizer logout na aplicação para que o id do usuário seja desassociado da sessão, assim evitando que os eventos sejam relacionados com algum outro usuário que seja logado na máquina, garantindo a integridade e validade dos dados trackeados.

Exemplo de Logout:

```typescript
 logoutCallback(): void {
    EventTracking.logout();
}
```

## Metodos de trackeamento disponíveis

A biblioteca disponibiliza 2 métodos para trackeamento: `page` e `track`. Ambos os métodos recebem 2 parâmetros:

-   `eventName: string` -> Nome do Evento. Seguindo o manifesto, deve seguir o padrão **Proper Case**. Exemplo: `Page Viewed`, `User Clicked`, `Payment Request Shared`.
-   `payload: any` -> um objeto contendo as informações que se deseja trackear. Exemplo:

```typescript
{
    button_name: `LOGIN`,
    page_name: 'LOGIN',
    context: `LOGIN`,
}
```

### Page

O método `page` deve ser utilizado para registrar visualizações de página como por exemplo mudanças de rotas junto com informações extras opcionais sobre a página que está sendo exibida. Para aplicações Angular, existe uma lib que contém um serviço que visa facilitar esse trackeamento e a documentação desse serviço pode ser lida [clicando aqui](https://github.com/PicPay/picpay-frontend/blob/develop/libs/angular/shared/track-events/README.md).

### Track

O método `track` deve ser utilizado para registrar as ações que osq usuários executam. Cada ação aciona o que chamamos de “evento”, que também pode ter propriedades associadas.
Você deseja rastrear eventos que são indicadores de sucesso de seu site, como inscrito, item comprado ou artigo marcado como favorito. Para aplicações Angular, existe uma lib que contém uma diretiva que visa facilitar esse trackeamento e a documentação dessa diretiva pode ser lida [clicando aqui](https://github.com/PicPay/picpay-frontend/blob/develop/libs/angular/shared/track-events/README.md).

# Como criar eventos

O nome dos eventos devem ser preparados e criados antes de serem usados. Veja com sua Squad e/ou Tech Manager quais serão os Eventos que serão criados, veja se eles já existem ou se já são usados em outros aplicações. Caso não existe, entre em contato com o time de Governança de dados para criar o evento para que ele seja devidamente trackeado.

# Troubleshooting
