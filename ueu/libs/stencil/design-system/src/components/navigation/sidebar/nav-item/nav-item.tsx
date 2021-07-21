import { MDCRipple } from '@material/ripple';
import { Component, Element, h, Prop, Host, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'apollo-nav-item',
    styleUrl: 'nav-item.scss',
})
export class NavItem {
    /**
     * Mark this item as disabled.
     */
    @Prop() disabled: boolean = false;

    /**
     * Mark this item as selected.
     */
    @Prop({
        reflect: true,
        mutable: true,
    })
    selected: boolean;

    /**
     * make the item selectable
     */
    @Prop() selectable = false;

    @Element() host: HTMLElement;

    /**
     * click of list-item handler
     */
    @Event() itemSelected: EventEmitter<void>;

    componentWillRender() {
        MDCRipple.attachTo(this.host);
    }

    handleClick() {
        if (this.selectable) {
            this.selected = !this.selected;
            this.itemSelected.emit();
        }
    }

    render() {
        return (
            <Host onClick={this.handleClick} tabindex={this.disabled ? -1 : 0} aria-disabled={this.disabled}>
                <apollo-box height="48px" paddingLeft="3" paddingRight="3" display="flex">
                    <apollo-flex spacer grow={1} alignItems="center">
                        <apollo-stack spacing="2" alignItems="center">
                            <slot name="item-start"></slot>
                            <apollo-text class="apollo-navitem__text" isTruncated>
                                <slot />
                            </apollo-text>
                        </apollo-stack>
                        <slot name="item-end"></slot>
                    </apollo-flex>
                </apollo-box>
            </Host>
        );
    }
}
