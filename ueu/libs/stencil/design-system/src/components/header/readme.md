# apollo-header

Default example

```html
<apollo-header backButton>
    <div slot="back-button">
        <apollo-icon-button icon="arrow_back"></apollo-icon-button>
    </div>
    <div slot="top-content">
        <span data-scroll-hidden>Breadcrumb</span>
    </div>
    <div slot="action">
        <apollo-icon-button icon="share"></apollo-icon-button>
        <apollo-icon-button icon="notifications"></apollo-icon-button>

        <apollo-avatar size="small" border="none"></apollo-avatar>
    </div>
    <div slot="title">
        <span class="apollo-page__title" data-scroll-anchor>
            title
        </span>
    </div>
</apollo-header>
```  
<br />
<br />

## apollo-header props and slots

<br />

### backButton Property and back-button slot

Make use of backButton property to make back-button and top-content slots visible

```html
<apollo-header backButton>
    <div slot="back-button">
        <apollo-icon-button icon="arrow_back"></apollo-icon-button>
    </div>
    <div slot="top-content">
        <span data-scroll-hidden>Breadcrumb</span>
    </div>
</apollo-header>
```  
<br />

### action slot

Action slots are used to customize header's actions.

```html
<apollo-header>
    <div slot="action">
        <apollo-icon-button icon="share"></apollo-icon-button>
        <apollo-icon-button icon="notifications"></apollo-icon-button>

        <apollo-avatar size="small" border="none"></apollo-avatar>
    </div>
</apollo-header>
```  
<br />

### title slot

Title slot is used to create the header's title on page, use `apollo-page_title` to style it correctly.

```html
<apollo-header>
    <div slot="title">
        <span class="apollo-page__title" data-scroll-anchor>
            title
        </span>
    </div>
</apollo-header>
```
<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type      | Default |
| ------------ | ------------- | ----------- | --------- | ------- |
| `backButton` | `back-button` | backButton  | `boolean` | `false` |
| `collapsed`  | `collapsed`   | collapsed   | `boolean` | `false` |
| `media`      | `media`       | media       | `boolean` | `false` |


----------------------------------------------

PicPay Doc
