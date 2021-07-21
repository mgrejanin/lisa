# shared-track-events

**Importante:** Antes de utilizar esses helpers, [leia a documentação da lib de Event Tracking](https://github.com/PicPay/picpay-frontend/tree/master/libs/packages/event-tracking) para garantir que sua aplicação inicou e configurou devidamente o Trackeamento.

Essa lib foi criada com a intenção de simplificar o trackeamento de eventos em aplicações Angular. Dentro dessa lib temos os helpers listado abaixo:

---

# Route Change Tracker Service

Este serviço automatiza o trackeamento de navegação entre as páginas da aplicação.

### Como utilizar?

Basta importar o módulo do serviço no `app.module.ts` na sua aplicação, conforme exemplo abaixo:

```typescript
import { SharedTrackEventsModule } from '@picpay/angular/shared/track-events';

@NgModule({
    ...
    imports: [
        SharedTrackEventsModule.forRoot(),
        ...
    ],
})
...
```

### Como funciona?

Ao importar o módulo desse serviço na sua aplicação, o serviço ficará ouvindo as mudanças de rota e chamando o método `page` da [lib de EventTracking](https://github.com/PicPay/picpay-frontend/tree/master/libs/packages/event-tracking) que de fato fará o trackeamento. O método será chamado com os seguintes dados:

```typescript
EventTracking.page('Page Viewed', {
    page_name: `/rota/atual`,
    page_title: `Page Title`,
    page_url: `${window.origin}/rota/atual`,
    referrer_url: `${window.origin}/rota/anterior`,
    search_parameters: window.location.search.substring(1),
    user_agent: window.navigator.userAgent,
});
```

---

# TrackClickDirective

Esta diretiva facilita o trackeamento de clicks.

### Como utilizar?

Basta importar o módulo da diretiva no módulo do componente em que a diretiva será utilizada, conforme exemplo abaixo:

```typescript
import { SharedTrackEventsDirectivesModule } from '@picpay/angular/shared/track-events';

@NgModule({
    ...
    imports: [
        SharedTrackEventsDirectivesModule
        ...
    ],
})
...
```

Depois de importar devidamente o módulo da diretiva, basta utilizar no componente onde o click deve ser trackeado da seguinte forma:

```html
<apollo-button
    picpayTrackClick
    eventName="Nome Do Evento"
    [eventPayload]="{ example_parameter: 'Readme Example Button' }"
>
    button
</apollo-button>
```

---
