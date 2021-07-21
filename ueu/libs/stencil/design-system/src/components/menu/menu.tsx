import { MDCMenu } from '@material/menu';
import { Component, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { EventEmitterData, Method } from '@stencil/core/internal';

@Component({
    tag: 'apollo-menu',
    styleUrl: 'menu.scss',
    shadow: false,
})
export class ApolloMenu {
    @Element() host: HTMLApolloMenuElement;

    /** Estado de aberto/fechado do menu */
    @Prop() defaultOpen = false;
    private internalOpenState = this.defaultOpen;

    /** Se é menu do select */
    @Prop() select = false;

    /** Evento disparado quando um item da lista é selecionado */
    @Event() itemSelect: EventEmitter<{ value: any; index: number; item: HTMLElement }>;

    /** Abre o menu */
    @Method()
    async open() {
        this.menu.open = true;
    }

    /** Fecha o menu */
    @Method()
    async close() {
        this.menu.open = false;
    }

    /** Alterna o estado do menu entre aberto/fechado */
    @Method()
    async toggle() {
        if (!this.internalOpenState) {
            this.menu.open = !this.menu.open;
        }
        this.internalOpenState = this.menu.open;
    }

    menu: MDCMenu;
    private anchor: HTMLElement | null;

    constructor() {
        this.anchor = this.host.querySelector(`[slot="anchor"] button`) || this.host.querySelector(`[slot="anchor"]`);
    }

    handleItemSelect = (event: EventEmitterData) => {
        const { value } = event.detail.item.parentNode || event.detail.item;
        this.itemSelect.emit({ value, ...event.detail });
    };
    private onAnchorClick = () => (this.menu.open = !this.menu.open);

    componentDidLoad() {
        this.menu = new MDCMenu(this.host.querySelector('.mdc-menu'));
        this.menu.listen('MDCMenu:selected', this.handleItemSelect);
        this.menu.open = this.defaultOpen;

        this.anchor?.addEventListener('click', this.onAnchorClick);
    }

    disconnectedCallback() {
        this.menu.destroy();
        this.anchor?.removeEventListener('click', this.onAnchorClick);
    }

    render() {
        return (
            <Host>
                {!this.select ? (
                    <div class="mdc-menu-surface--anchor">
                        <slot name="anchor"></slot>

                        <div class="mdc-menu mdc-menu-surface">
                            <slot></slot>
                        </div>
                    </div>
                ) : (
                    <div class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth">
                        <slot></slot>
                    </div>
                )}
            </Host>
        );
    }
}
