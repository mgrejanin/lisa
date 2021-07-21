import { Component, Element, EventEmitter, h, Host, Prop, Event } from '@stencil/core';
import { MDCRipple } from '@material/ripple';

import { Token } from './../../../../../packages/sass-functions/src/lib/tokens';
import { ResponsiveProp } from './../../helpers/responsive.helper';
import { setPropStyle } from './../../helpers/set-prop-style';

export type BorderRadius = ResponsiveProp<keyof typeof Token.borderRadius>;

@Component({
    tag: 'apollo-ripple',
    styleUrl: 'ripple.scss',
    shadow: false,
})
export class Ripple {
    borderRadius: BorderRadius;

    @Element() el: HTMLElement;

    /**
     * Abreviação de propriedade de estilo `height`
     */
    @Prop()
    height: string;

    /**
     * Abreviação de propriedade de estilo `width`
     */
    @Prop()
    width: string;

    /**
     * Abreviação de propriedade de estilo `width`
     */
    @Prop()
    round: boolean = false;

    onKeyUp = (ev: KeyboardEvent) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
            this.apolloClick.emit(ev);
        }
    };

    /**
     * Evento de keyUp
     */
    @Event() apolloClick: EventEmitter;
    onClick = (ev: MouseEvent) => {
        this.apolloClick.emit(ev);
    };

    componentWillRender() {
        MDCRipple.attachTo(this.el);

        if (this.round) {
            this.borderRadius = 'pill';
        }
    }

    render() {
        return (
            <Host class={setPropStyle(this)} tabindex="0" role="button" onKeyUp={this.onKeyUp} onClick={this.onClick}>
                <slot />
            </Host>
        );
    }
}
