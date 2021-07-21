# @picpay/stencil-sass

Essa biblioteca tem o intuito de pré compilar arquivos SASS dentro dos componentes Stencil

## Instalação

Instale o nosso pacote diretamente do yarn, **certifique-se que o seu npm registry está configurado com a Organization PicPay com o token de autenticação da conta do seu github **

```
yarn add @picpay/stencil-sass
```

Agora, vamos aplicá-lo no arquivo de configuração do Stencil, o `stencil.config.ts`;

```ts
import { Config } from '@stencil/core';

// ...
import { sass } from '@picpay/stencil-sass';

export const config: Config = {
    // ...
    plugins: [sass()],
};
```

## Opções de configuração na função `sass()` - PluginOptions

Existe uma série de propriedades disponíveis para configuração do plugin, cada opção você pode consultar na própria documentação do sass clicando [aqui](https://www.npmjs.com/package/sass#api);

## Note que na documentação de API do pacote sass mostra a aplicação dentro de um método `render()`, a nossa biblioteca já adianta essa parte da função, então **NÃO** é necessário implementar a função `.render()`;

```ts
import { Config } from '@stencil/core';

// ...
import { sass } from '@picpay/stencil-sass';

const options: PluginOptions = {}; // sass plugin options

export const config: Config = {
    // ...
    plugins: [sass(options)],
};
```

## Executando testes unitários

Rode `nx test packages-stencil-sass` para rodar os testes unitários via [Jest](https://jestjs.io).
