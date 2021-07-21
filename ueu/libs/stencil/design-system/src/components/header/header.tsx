import { Component, Element, Host, h, Prop, Watch } from '@stencil/core';
import classnames from 'classnames';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    tag: 'apollo-header',
    styleUrl: 'header.scss',
    shadow: false,
})
export class ApolloHeader {
    @Element() host: HTMLApolloHeaderElement;

    /**
     * collapsed
     */
    @Prop() collapsed: boolean = false;
    @Watch('collapsed')
    handleCollapsed(collapsed: boolean, old: boolean) {
        this.prepareElementAnimations(collapsed, old);
    }

    /**
     * backButton
     */
    @Prop() backButton: boolean = false;

    /**
     * media
     */
    @Prop() media: boolean = false;

    private scrollElements: NodeListOf<Element>;
    private scrollAnchor: DOMRect[] = [];
    private headerDimension: DOMRect = new DOMRect();
    private scrollEvent: Subscription;

    constructor() {
        this.scrollElements = this.host.querySelectorAll('[data-scroll-anchor]');
    }

    connectedCallback() {
        this.scrollEvent = fromEvent(window, 'scroll')
            .pipe(debounceTime(50), distinctUntilChanged())
            .subscribe(() => {
                const parentPosition = (this.host.parentNode as HTMLElement).getBoundingClientRect();

                if (parentPosition.y < -40) {
                    this.collapsed = true;
                } else {
                    this.collapsed = false;
                }
            });
    }

    disconnectedCallback() {
        this.scrollEvent.unsubscribe();
    }

    componentDidRender() {
        if (this.scrollAnchor.length > 0) {
            this.headerHeightAnimation();
            this.elementAnimation();
        }
    }

    private prepareElementAnimations = (collapsed: boolean, old: boolean) => {
        if (collapsed !== old) {
            this.collapsed = collapsed;
            this.headerDimension = this.host.getBoundingClientRect();
            this.scrollElements.forEach((element: Element, index: number) => {
                this.scrollAnchor[index] = element.getBoundingClientRect();
            });
        }
    };

    private headerHeightAnimation = () => {
        const hostHeight = this.host.getBoundingClientRect().height;
        const headerHeight = this.headerDimension.height;

        this.host.style.transition = 'none';
        this.host.style.minHeight = `${this.headerDimension.height}px`;
        this.host.style.marginBottom = `0px`;

        requestAnimationFrame(() => {
            this.host.style.transition = 'all 200ms ease-out';
            this.host.style.minHeight = `0px`;
            this.host.style.marginBottom = `${headerHeight - hostHeight < 0 ? 0 : headerHeight - hostHeight}px`;
        });
    };

    private elementAnimation = () => {
        this.scrollElements.forEach((element: HTMLElement, index: number) => {
            element.style.transition = 'none';
            element.style.transform = `translateX(${
                this.scrollAnchor[index]?.x - element.getBoundingClientRect().x
            }px) translateY(${this.scrollAnchor[index]?.y - element.getBoundingClientRect().y}px)`;
            requestAnimationFrame(() => {
                element.style.transition = 'all 200ms ease-out';
                element.style.transform = `translateX(0px) translateY(0px)`;
            });
        });
    };

    render() {
        return (
            <Host
                class={classnames({
                    '--collapsed': this.collapsed,
                    '--back-button': this.backButton,
                    '--media': this.media,
                })}
            >
                <div class="apollo-header__column --back-button">
                    <slot name="back-button" />
                </div>
                <div class="apollo-header__column --top-content">
                    <slot name="top-content" />
                </div>
                <div class="apollo-header__column --action">
                    <slot name="action" />
                </div>
                <div class="apollo-header__column --media">
                    <slot name="media" />
                </div>
                <div class="apollo-header__column --title">
                    <slot name="title" />
                    <slot />
                </div>
            </Host>
        );
    }
}
