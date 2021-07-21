# Dev Portal Shared (dev-portal-shared)

-   [Components](#Components)
    -   [Banner](#Banner)
    -   [Carousel](#Carousel)
    -   [Code Snippet](#CodeSnippet)
    -   [Contact Form](#ContactForm)
    -   [Error Container](#ErrorContainer)
    -   [Footer](#Footer)
    -   [Header](#Header)
    -   [Logo](#Logo)
    -   [Notice](#Notice)
    -   [Upload Avatar](#UploadAvatar)
-   Data Access
-   Interfaces
-   Resolvers
-   Utils

&nbsp;

## Components

Todos os componentes e como implementar cada um deles

&nbsp;

### Banner

Componente para inserção de banner nas páginas. Utilizado tando na home do Studio PicPay quanto nas páginas internas de produtos.

&nbsp;

#### **Caso de uso**

O componente foi idealizado com o padrão de uma coluna dedicada à uma imagem/ícone e outra dedicada ao conteúdo (podendo ser título, texto, botão, etc).

Se o banner que for implementado na página seguir o padrão de imagem conteúdo, utilize o componente de Banner.

&nbsp;

#### **Como implementar?**

Para utiliza-lo, primeiramente chame no módulo do seu componente o DevPortalSharedModule:

`import { DevPortalSharedModule } from '@picpay/dev-portal/shared';`

E para usar no componente utilize a tag:

`<dev-portal-banner></dev-portal-banner>`

Dentro da tag, é permitido usar:

-   `<banner-content></banner-content>` - Para colocar conteúdo como título e subtítulo.

-   `<banner-actions></banner-actions>` - Para colocar botões de ação. Utiliza-se dentro da tag banner-content

-   `<banner-image></banner-image>` - Para inserir uma imagem/ícone.

&nbsp;

#### **Propriedades**

Para personalizar o componente na nova página estão disponíveis as propriedades:

| Propriedades        |                    Descrição                     |   Type | Default |          |
| ------------------- | :----------------------------------------------: | -----: | ------: | -------: |
| **height**          |        Configuração da altura do banner.         | string |   435px | opcional |
| **backgroundColor** |            Modificar a cor de fundo.             | string | #1A1A1A | opcional |
| **backgroundImage** |      Inserir imagem de fundo para o mobile.      | string |         | opcional |
| **reverse**         | Inverter a ordem das colunas de texto e image.\* | string |   false | opcional |
| **col_image**       |  Quantidade de colunas que a imagem vai ocupar.  | string |   4 col | opcional |
| **col_content**     |  Quantidade de colunas que o texto vai ocupar.   | string |   4 col | opcional |
| **offset**          |   Quantos colunas serão espaçadas à esquerda.    | string |       0 | opcional |
| **justify_content** |              Alinhamento dos itens.              | string |  center | opcional |

&nbsp;

#### Exemplo

```html
<dev-portal-banner backgroundColor="#172126" reverse="true" col_image="4" col_content="6" offset="1">
    <div banner-image>
        <img alt="Portal do Desenvolvedor" src="./assets/images/portaldev.png" />
    </div>
    <div banner-content>
        <h1>
            Crie experiências<br />
            com o PicPay
        </h1>
        <p>Construa o mercado de pagamentos com a gente. É fácil e rápido integrar com nossas soluções.</p>
        <div banner-actions *ngIf="isMobile === false">
            <apollo-button class="btn-white" (click)="openDialog()" id="btn_contact_product" role="button">
                <apollo-icon class="panel__icon material-icon">vpn_key</apollo-icon> Usar esse produto
            </apollo-button>
        </div>
    </div>
</dev-portal-banner>
```

&nbsp;

## Data Access

&nbsp;

## Interfaces

&nbsp;

## Resolvers

&nbsp;

## Utils

&nbsp;

## Running unit tests

Run `nx test dev-portal-shared` to execute the unit tests.
