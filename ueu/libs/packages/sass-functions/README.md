# sass-functions

Essa biblioteca tem o intuito de injetar uma função `theme` para ser utilizada em arquivos sass (.sass, .scss).
Através da configuração `functions` da lib `stencil-sass`, podemos personalizar qualquer função. Utilizamos essa estratégia para consumirmos tokens do Design System e mantermos uma implementação visual harmônica entre vários projetos da empresa.
Consulte a documentação da lib `sass-functions/tokens` para saber mais sobre todas propriedades utilizadas através da função `theme`.

## Instalação

Vamos aplicá-lo no arquivo de configuração do Stencil, o `stencil.config.ts`;

```ts
import { Config } from '@stencil/core';

// ...
import { sass } from '../../../libs/packages/stencil-sass/src';
import { sassFunctions } from '../../../libs/packages/sass-functions/src';

export const config: Config = {
    // ...
    plugins: [
        sass({
            // ...
            functions: {
                'theme($value)': sassFunctions.theme
            },
        }),
    ],
};
```

## Utilização

**OBS:** Consulte a lib `sass-functions/tokens` para saber mais sobre todas as propriedades disponíveis.

Exemplo de implementação com DS tokens via sass-function `theme()`;

```scss
.some-class {
    padding: theme('spacing.2');
}
```

Exemplo de conversão de CSS Vars para cores nas dimensões do SASS.

```scss
.some-class {
    background-color: parseColor('var(--my-var, #000)');
}
```

# @picpay/design-system-tokens

Essa biblioteca tem o intuito de transformar todos os design tokens definido pelo time de Designers em propriedades que possam ser consumidas dentro do código. Assim, toda vez que houver alguma alteração nos tokens, será realizada somente em um lugar e todos os projetos irão ser atualizados automaticamente. Permitindo uma melhor manutenção e escalabilidade dos padrões de layout da empresa.

## Instalação

Instale o nosso pacote diretamente do npm, **certifique-se que o seu npm registry está configurado com a Organization PicPay com o token de autenticação da conta do seu github **

```
npm install @picpay/design-system-tokens
```

## Implementação

A classe `Apollo` fornece uma API simples e fácil. Tornando-se uma abstração para os tokens de Design e fazendo com que eles fiquem cada vez mais semânticos para as aplicações.

```ts
// Spacing
Apollo.spacing(prop);

// Color
Apollo.color(prop);

// Color brand
Apollo.brand(prop);

// FontSize
Apollo.fs(prop);

// Type
Apollo.type(prop);

// FontWeight
Apollo.fontWeight(prop);

// LineHeight
Apollo.lineHeight(prop);

// Opacity
Apollo.opacity(prop);

// Border
Apollo.borderWidth(prop);

// Border Color
Apollo.borderRadius(prop);

// Shadow
Apollo.boxShadow(prop);

// Transition
Apollo.transition(prop);

// Layouts
Apollo.layout(prop);

// Size
Apollo.size(prop);

// GET
Apollo.get(prop);
```
## Tokens puros

Você pode precisar dos tokens de forma pura pra fins de tipagem por exemplo, pra isso é só importar da constante `Token` que é exportada por padrão na biblioteca

Exemplo de implementação em um componente stencil .tsx:

```ts
import { Component, h, Host, Prop } from '@stencil/core';

import { Token } from 'libs/packages/sass-functions/src/lib/tokens';

// ...

// Tambem é possível incorporar os tokens em tipagens para serem renderizados na hora de implementar tal propriedade com a tipagem.
export type Size = ResponsiveProp<keyof typeof Token.size>;
export type Spacing = ResponsiveProp<keyof typeof Token.spacing>;

@Component({
    tag: 'some-component',
    styleUrl: 'container.scss',
    shadow: false,
})
export class SomeComponent {
    paddingLeft: Spacing = '2';
    paddingRight: Spacing = '2';

    render() {
        return <Host>...</Host>;
    }
}
```

## ThemeConfig

Caso você precise do objeto de configuração da classe Apollo é só usar a constante `ThemeConfig` que também é exportada por padrão na biblioteca.

```ts
import { ThemeConfig } from 'libs/packages/sass-functions/src/lib/tokens';

const primaryColor = ThemeConfig.colors.colorPalette.primary.base;
```

## Executando testes unitários

Rode `nx test packages-sass-functions` para rodar os testes unitários via [Jest](https://jestjs.io).