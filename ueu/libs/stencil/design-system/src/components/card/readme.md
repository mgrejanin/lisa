<!-- # apollo-card

Cards contain content and actions about a single subject.

The card content is the only required element in a card. All other elements shown here are optional.

Card layouts can vary to support the types of content they contain. The following elements are commonly found among that variety.

~~~html
<apollo-card>
    <apollo-card-content>
        <h4></h4>
        <p></p>
        ...
    </apollo-card-content>
</apollo-card>
~~~

Card default is `unelevated` if would like to change add the propriety `variant="outlined"`

~~~html
<apollo-card variant="outlined">
    <apollo-card-content>
        ...
    </apollo-card-content>
</apollo-card>
~~~


---

## apollo-card-media

### Example

~~~html
<apollo-card>
    <apollo-card-media image=""></apollo-card-media>
    <apollo-card-content>
        ...
    </apollo-card-content>
</apollo-card>
~~~

### Properties Card Media

| Property | Attribute | Description                                                                                                          | Type                          | Default     |
| -------- | --------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ----------- |
| `format` | `format`  | Escala automaticamente a altura da área de mídia de acordo com sua largura, mantendo uma proporção quadrada ou 16:9. | `"16:9" \| "1:1" \| "square"` | `'square'`  |
| `image`  | `image`   | Escala automaticamente a altura da área de mídia de acordo com sua largura, mantendo uma proporção quadrada ou 16:9. | `string`                      | `undefined` |

---

## apollo-card-actions

### Example
~~~html
<apollo-card>
    <apollo-card-content>
        <h1>Card Title</h1>
        <p>Teste sub text</p>
    </apollo-card-content>
    <apollo-card-actions>
        <apollo-card-action-buttons>
            <apollo-button>click here</apollo-button>
            <apollo-button variant="link">see more</apollo-button>
        </apollo-card-action-buttons>
        <apollo-card-action-icons>
            <apollo-icon-button iconPack="objects" icon="heart" toggle></apollo-icon-button>
            <apollo-icon-button iconPack="interface" icon="ellipsis-v" toggle></apollo-icon-button>
        </apollo-card-action-icons>
    </apollo-card-actions>
</apollo-card>
~~~


## Structure
1. **Content**

   Card content hold all card elements, and their size is determined by the space those elements occupy. Card elevation is expressed by the container.

2. **Media [optional]**

    Cards can include a variety of media, including photos, and graphics, such as icons.

3. **Buttons [optional]**

   Cards can include buttons for actions.

4. **Icons [optional]**

   Cards can include icons for actions.


## Card sections

Element   | Valor do exemplo
--------- | :------:
`apollo-card-actions` |	Container for buttons and icons at the bottom of the card
`apollo-card-action-buttons` | Container for buttons
`apollo-card-action-icons`| Container for icons
`apollo-card-content`| Intended for blocks of text
`apollo-card-media`| Stretches the image to the container width
`apollo-card-media-content`| Intended for blocks of text inside media

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                             | Type                              | Default        |
| --------- | --------- | ------------------------------------------------------- | --------------------------------- | -------------- |
| `radius`  | `radius`  | Propriedade para controlar border-radius do componente. | `"light" \| "medium" \| "strong"` | `'light'`      |
| `variant` | `variant` | O estilo do card                                        | `"outlined" \| "unelevated"`      | `'unelevated'` |


----------------------------------------------

PicPay Doc
