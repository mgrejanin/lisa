# Apollo Design System - style lint plugin

Criamos um plugin para o stylelint poder validar o uso de nossos design tokens.

Devido ao redesign teremos `breaking changes` em alguns tokens. O plugin trás regras de css para podermos previnir o uso de tokens `depreciados/removidos`, deste modo previnindo a quebra de layout.

<b>Atencão</b>: o plugin não está configurado no monorepo, logo nenhuma destas regras valem atualmente. Será configurado apenas após a virada de cada token. 


### Como configurar

Para configurar o plugin é necessário incluir configuração de `plugin` e `rules` no arquivo `.stylelintrc.yaml`. Veja exemplo abaixo:

```yaml
plugins:
    - './libs/stencil/design-system/tools/stylelint/stylelint-plugin-apollo/dist/index.js'
rules:
    apollo-scss/colors: true
    apollo-scss/border: true
    apollo-scss/spacing: true
```

### Regras disponibilizadas:

<b>`apollo-scss/colors`</b>: Regra valida o uso de tokens e hexadecimais depreciados. ex: `theme('colors.primary')` / `color: #00ac4a`.

<b>`apollo-scss/border`</b>: Regra valida o uso de tokens depreciados. ex: `theme('borderWidth.light')`.

<b>`apollo-scss/spacing`</b>: Regra valida o uso de tokens depreciados. ex: `theme('spacing.half')`.

### Contribuindo

Após realizar qualquer alteração dentros dos arquivos do plugin é necessário realizar o build do mesmo.

Para isso execute o comando abaixo: 

- `yarn stylelint-apollo:build`

Encontrou algum problema com a documentação ou nosso plugin? 
Clique <a href="https://github.com/PicPay/picpay-frontend/issues/new?title=[DS]Apollo stylelint plugin">aqui</a> e abra uma issue.