import { Component, Element, Event, EventEmitter, h, Host, Prop, ComponentInterface, Watch } from '@stencil/core';
import classnames from 'classnames';

import { MDCIconButtonToggle } from '@material/icon-button';
import { MDCRipple } from '@material/ripple';

@Component({
    tag: 'apollo-icon-button',
    styleUrl: 'icon-button.scss',
    shadow: false,
})
export class ApolloIconButton implements ComponentInterface {
    private buttonRipple: MDCRipple;
    private hostButton: HTMLButtonElement;
    private iconToggle: MDCIconButtonToggle;

    @Element() host: HTMLApolloIconButtonElement;

    /**
     * Evento disparado quando o valor do componente muda
     */
    @Event() apolloChange: EventEmitter<boolean>;

    /**
     * Evento disparado quando o componente perde o foco
     */
    @Event() apolloBlur: EventEmitter<null>;

    /**
     * checked
     */
    @Prop({
        mutable: true,
    })
    checked = false;

    // eslint-disable-next-line @stencil/decorators-style
    @Watch('checked')
    handleChecked(newVal: boolean) {
        this.iconToggle.on = newVal;
        this.apolloChange.emit(newVal);
    }

    /**
     * disabled
     */
    @Prop({
        reflect: true,
    })
    disabled = false;

    /**
     * pid
     */
    @Prop() pid = '';

    /**
     * size
     * @prop reflect: O CSS usa a referência do atributo no elemento para aplicar algumas regras
     */
    @Prop({
        reflect: true,
    })
    size: 'sm' | 'md' = 'md';

    /**
     * labelOn
     */
    @Prop({
        reflect: true,
    })
    labelOn = '';

    /**
     * labelOff
     */
    @Prop({
        reflect: true,
    })
    labelOff = '';

    /**
     * icon
     */
    @Prop({
        reflect: true,
    })
    icon = '';

    /**
     * iconOn
     */
    @Prop({
        reflect: true,
    })
    iconOn = '';

    /**
     * iconOff
     */
    @Prop({
        reflect: true,
    })
    iconOff = '';

    /**
     * iconPack
     */
    @Prop() iconPack = 'material-icon';

    /**
     * color
     */
    @Prop() color = '';

    /**
     * Habilita o estado inválido do input
     */
    @Prop({
        reflect: true,
    })
    invalid = false;

    componentDidRender() {
        this.iconToggle?.on && this.checked;
    }

    componentDidLoad() {
        this.hostButton = this.host.querySelector('.mdc-icon-button');

        this.buttonRipple = new MDCRipple(this.hostButton);
        this.buttonRipple.unbounded = true;

        this.iconToggle = new MDCIconButtonToggle(this.hostButton);
        this.iconToggle.on = this.checked;
        this.iconToggle.listen('MDCIconButtonToggle:change', this.listenHandler);

        // MDC não suporta aria-pressed quando existe aria-label toggle
        // Por questões de acessibilidade o retorno precisa ser booleano em string
        if (this.labelOn.length <= 0 && this.labelOff.length <= 0) {
            this.hostButton.setAttribute('aria-pressed', this.checked ? 'true' : 'false');
        }
    }

    disconnectedCallback() {
        this.buttonRipple.destroy();
        this.iconToggle.unlisten('MDCIconButtonToggle:change', this.listenHandler);
        this.iconToggle.destroy();
    }

    private listenHandler = () => {
        this.checked = !this.checked;
    };

    private onBlur = () => {
        this.apolloBlur.emit();
    };

    render() {
        return (
            <Host>
                <button
                    id={this.pid}
                    class={classnames('mdc-icon-button', {
                        'mdc-icon-button--invalid': this.invalid,
                    })}
                    aria-label={this.labelOff}
                    data-aria-label-on={this.labelOn}
                    data-aria-label-off={this.labelOff}
                    onBlur={this.onBlur}
                    disabled={this.disabled}
                >
                    {this.iconPack === 'material-icon' ? (
                        <apollo-icon
                            class={classnames(
                                'mdc-icon-button__icon mdc-icon-button__icon--on',
                                this.iconPack,
                                this.iconOn || this.icon,
                            )}
                            color={this.color}
                            size={this.size}
                        >
                            {this.iconOn || this.icon}
                        </apollo-icon>
                    ) : (
                        <apollo-icon
                            class={classnames(
                                'mdc-icon-button__icon mdc-icon-button__icon--on',
                                this.iconOn || this.icon,
                            )}
                            svgIcon={this.iconOn || this.icon}
                            size={this.size}
                            fill={this.color}
                        ></apollo-icon>
                    )}

                    {this.iconPack === 'material-icon' ? (
                        <apollo-icon
                            class={classnames('mdc-icon-button__icon', this.iconPack, this.iconOff || this.icon)}
                            color={this.color}
                            size={this.size}
                        >
                            {this.iconOff || this.icon}
                        </apollo-icon>
                    ) : (
                        <apollo-icon
                            class={classnames('mdc-icon-button__icon', this.iconOff || this.icon)}
                            svgIcon={this.iconOff || this.icon}
                            size={this.size}
                            fill={this.color}
                        ></apollo-icon>
                    )}
                </button>
            </Host>
        );
    }
}
