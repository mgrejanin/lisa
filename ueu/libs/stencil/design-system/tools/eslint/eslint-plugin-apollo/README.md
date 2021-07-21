# Apollo Design System - eslint lint plugin

Criamos um plugin para o eslint(`eslint-plugin-apollo`) poder validar o uso de nossos componentes do `apollo design system`.

<b>Atencão</b>: o plugin não está configurado no monorepo, logo nenhuma destas regras valem atualmente. Será configurado de forma progressiva, regra por regra para que não seja gerado muitos warnings de uma vez só.



### Como configurar

Para configurar o plugin é necessário seguir os passos abaixo:

Instalar o plugin como dependência de desenvolvimento:

-   `yarn add file:libs/stencil/design-system/tools/eslint/eslint-plugin-apollo --dev`

Incluir o plugin do apollo na configuracão de `plugins` no arquivo `.eslintrc.json`:

```js
"plugins": ["apollo"],
```

Feito isso, basta apenas incluir as regras necessárias dentro de `rules` no arquivo `.eslintrc.json`:

```js
"rules": {
    "apollo/jsx-usage-reinforcer": "error",
    "apollo/html-usage-reinforcer": "error",
}
```

Para testar as regras basta rodar o lint em cima de algum projeto. ex:

- `nx lint dev-portal-home`



### Regras disponibilizadas:

<b>`apollo/jsx-usage-reinforcer`</b>: Regra do Eslint para prevenir o uso de tags nativas e reforçar o uso apollo design system. Arquivos `.jsx`/`.tsx`.

<b>`apollo/html-usage-reinforcer`</b>:  Regra do Eslint para prevenir o uso de tags nativas e reforçar o uso apollo design system. Arquivos `.html`.

<b>`apollo/jsx-paragraph-tag`</b>:  Regra do Eslint para prevenir o uso de tags nativas `<p>` e reforçar o uso do `<apollo-text>`, equivalente estável dentro do apollo design system. Arquivos `.jsx`/`.tsx`.

<b>`apollo/html-paragraph-tag`</b>:  Regra do Eslint para prevenir o uso de tags nativas `<p>` e reforçar o uso do `<apollo-text>`, equivalente estável dentro do apollo design system. Arquivos `.html`.

<b>`apollo/jsx-anchor-tag`</b>:  Regra do Eslint para prevenir o uso de tags nativas `<a>` e reforçar o uso do `<apollo-link>`, equivalente estável dentro do apollo design system. Arquivos `.jsx`/`.tsx`.

<b>`apollo/html-anchor-tag`</b>:  Regra do Eslint para prevenir o uso de tags nativas `<a>` e reforçar o uso do `<apollo-link>`, equivalente estável dentro do apollo design system. Arquivos `.html`.

<b>`apollo/jsx-h1-tag`</b>:  Regra do Eslint para prevenir o uso de tags nativas `<h1>` e reforçar o uso do `<apollo-heading>`, equivalente estável dentro do apollo design system. Arquivos `.jsx`/`.tsx`.

<b>`apollo/html-h1-tag`</b>:  Regra do Eslint para prevenir o uso de tags nativas `<h1>` e reforçar o uso do `<apollo-heading>`, equivalente estável dentro do apollo design system. Arquivos `.html`.

<b>`apollo/jsx-h2-tag`</b>:  Regra do Eslint para prevenir o uso de tags nativas `<h2>` e reforçar o uso do `<apollo-heading>`, equivalente estável dentro do apollo design system. Arquivos `.jsx`/`.tsx`.

<b>`apollo/html-h2-tag`</b>:  Regra do Eslint para prevenir o uso de tags nativas `<h2>` e reforçar o uso do `<apollo-heading>`, equivalente estável dentro do apollo design system. Arquivos `.html`.

<b>`apollo/jsx-h3-tag`</b>:  Regra do Eslint para prevenir o uso de tags nativas `<h3>` e reforçar o uso do `<apollo-heading>`, equivalente estável dentro do apollo design system. Arquivos `.jsx`/`.tsx`.

<b>`apollo/html-h3-tag`</b>:  Regra do Eslint para prevenir o uso de tags nativas `<h3>` e reforçar o uso do `<apollo-heading>`, equivalente estável dentro do apollo design system. Arquivos `.html`.

<b>`apollo/jsx-h4-tag`</b>:  Regra do Eslint para prevenir o uso de tags nativas `<h4>` e reforçar o uso do `<apollo-heading>`, equivalente estável dentro do apollo design system. Arquivos `.jsx`/`.tsx`.

<b>`apollo/html-h4-tag`</b>:  Regra do Eslint para prevenir o uso de tags nativas `<h4>` e reforçar o uso do `<apollo-heading>`, equivalente estável dentro do apollo design system. Arquivos `.html`.

<b>`apollo/jsx-h5-tag`</b>:  Regra do Eslint para prevenir o uso de tags nativas `<h5>` e reforçar o uso do `<apollo-heading>`, equivalente estável dentro do apollo design system. Arquivos `.jsx`/`.tsx`.

<b>`apollo/html-h5-tag`</b>:  Regra do Eslint para prevenir o uso de tags nativas `<h5>` e reforçar o uso do `<apollo-heading>`, equivalente estável dentro do apollo design system. Arquivos `.html`.

<b>`apollo/jsx-h6-tag`</b>:  Regra do Eslint para prevenir o uso de tags nativas `<h6>` e reforçar o uso do `<apollo-heading>`, equivalente estável dentro do apollo design system. Arquivos `.jsx`/`.tsx`.

<b>`apollo/html-h6-tag`</b>:  Regra do Eslint para prevenir o uso de tags nativas `<h6>` e reforçar o uso do `<apollo-heading>`, equivalente estável dentro do apollo design system. Arquivos `.html`.





Encontrou algum problema com a documentação ou nosso plugin?
Clique <a href="https://github.com/PicPay/picpay-frontend/issues/new?title=[DS]Apollo eslint plugin">aqui</a> e abra uma issue.
