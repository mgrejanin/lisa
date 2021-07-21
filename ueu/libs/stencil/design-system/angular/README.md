# design-system-angular

## Como configurar

No módulo principal da sua aplicação, importe o módulo **DesignSystemAngularModule** com o **forRoot()**:

```javascript
// app.module.ts

import { DesignSystemAngularModule } from '@picpay/design-system-angular';

@NgModule({
    imports: [
        DesignSystemAngularModule.forRoot(),
        // ...
    ],
    // ...
})

export class AppModule{};
```

Nos módulos internos da sua lib, importe o módulo **DesignSystemAngularModule**, dessa vez sem o forRoot():

```javascript
// lib-internal.module.ts

import { DesignSystemAngularModule } from '@picpay/design-system-angular';

@NgModule({
    imports: [
        DesignSystemAngularModule,
        // ...
    ],
    // ...
})

export class LibInternalModule{};

```

## Como utilizar

Feito toda a configuração acima os componentes do Apollo Design System já estarão disponíveis para uso.

Para mais informações sobre quais tokens e componentes estão disponíveis no Apollo, consulte os links:

* [Storybook](https://storybook.sandbox.limbo.work/?path=/story/bem-vindo-primeiros-passos-inicio--page)
* [Zero Height](https://zeroheight.com/77bc80ae1/p/30c42e-)

## Control Value Accessor 

A biblioteca DesignSystemAngularModule também implementa as diretivas de ControlValueAccessor.

* Boolean Value Accessor
* Numeric Value Accessor
* Radio Value Accessor
* Select Value Accessor
* Text Value Accessor
* Value Accessor

## Exemplo de utilização do validator customizado

No form do html informar o formGroup:

```html
<form [formGroup]="formName"></form>
```

Informar o formControlName no apollo-textfield:

```html
<apollo-textfield
      label="name"
      formControlName="name"
      required
      size="md"
      maxlength="99"
></apollo-textfield>
```

Fazer a chamada do customMessage no arquivo .ts:

```javascript
ngOnInit(): void {
    this.formName = this.formBuilder.group({
        Name: [
            '',
            [
                Validators.required,
                customMessage(
                    Validators.pattern('^[A-Z][A-Z0-9_]*$'), 'Mensagem',
                ),
            ],
        ],
    });
}
```

Caso precise inserir uma customização diferente, é necessário configurar antes no arquivo:  
`libs/stencil/design-system/angular/src/lib/control-value-accessors/value-accessor.ts`

## Testes Unitários

Utilize o comando `nx test design-system-angular` para executar os testes unitários.
