# Objetivo do picpay-if-roles

O objetivo dessa diretiva é controlar a exibição de componentes baseado nas roles que o usuário logado possui.

# Como usar

No módulo onde a diretiva será utilizada, use:

```
import { PicpayIfRolesModule, PicpayIfRolesService } from '@picpay/shared/directives';
...

imports: [..., PicpayIfRolesModule],
providers: [ ...,
{ provide: PicpayIfRolesService, useClass: NameQueryExample }],
```

Dentro desse `NameQueryExample` deve existir o método `getUserRoles` que será usado pelo `PicpayIfRolesService` pra definir qual perfil o usuário pertence.

No HTML do component onde a diretiva será usada, no elemento que precisa de validação de role para ser exibida, utilize da seguinte forma:

```
<h1 *picpayIfRoles="['test']">Olá usuário do perfil teste!</h1>
```

Onde `test` é a role que o usuário necessita ter para que o elemento seja mostrado.

Dentro do spec.ts:

```
import { PicpayIfRolesModule, PicpayIfRolesService, PicpayIfRolesServiceMock } from '@picpay/shared/directives';

beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ...
                MockModule(PicpayIfRolesModule),
            ],
            ...
            providers: [
                ...,
                { provide: PicpayIfRolesService, useValue: new PicpayIfRolesServiceMock(['test']) },
            ],
        }).compileComponents();
});
```

Dentro do projeto seller panel existe um exemplo prático de como fazer.

## Rodar testes unitários

Rode `nx test shared-directives` para executar os testes.
