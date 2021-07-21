# apollo-search-bar



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description           | Type     | Default     |
| -------- | --------- | --------------------- | -------- | ----------- |
| `value`  | `value`   | Seta o valor do input | `string` | `undefined` |


## Events

| Event          | Description                                                                                               | Type                      |
| -------------- | --------------------------------------------------------------------------------------------------------- | ------------------------- |
| `apolloBlur`   | Evento disparado quando o campo perde o foco                                                              | `CustomEvent<FocusEvent>` |
| `apolloChange` | Evento disparado quando o usuário termina de digitar e o tempo de atraso de envio do evento for concluído | `CustomEvent<any>`        |
| `apolloFocus`  | Evento disparado quando o campo recebe foco                                                               | `CustomEvent<FocusEvent>` |


## Dependencies

### Used by

 - [apollo-toolbar](..)

### Depends on

- [apollo-box](../../../layouts/box)
- [apollo-stack](../../../layouts/stack)
- [apollo-icon](../../../icon)
- [apollo-text](../../../layouts/text)
- [apollo-textfield-icon](../../../textfield/icon)

### Graph
```mermaid
graph TD;
  apollo-search-bar --> apollo-box
  apollo-search-bar --> apollo-stack
  apollo-search-bar --> apollo-icon
  apollo-search-bar --> apollo-text
  apollo-search-bar --> apollo-textfield-icon
  apollo-toolbar --> apollo-search-bar
  style apollo-search-bar fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

PicPay Doc
