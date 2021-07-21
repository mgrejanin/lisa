import { Component, Event, EventEmitter, h, Host, Method, Prop, ComponentInterface } from '@stencil/core';
import classnames from 'classnames';

import { MDCFormField } from '@material/form-field';
import { MDCSwitch } from '@material/switch';

@Component({
    tag: 'apollo-switch-toggle',
    styleUrl: 'switch-toggle.scss',
    shadow: false,
})
export class ApolloSwitchToggle implements ComponentInterface {
    private switchElement: HTMLDivElement;
    private formField: MDCFormField;
    private formFieldElement: HTMLDivElement;
    private switch: MDCSwitch;
    private rangeId: number = Math.round(Math.random() * 99999);

    /**
     * Evento disparado quando o valor do componente muda
     */
    @Event() apolloChange: EventEmitter<boolean>;

    /**
     * Evento disparado quando o componente perde o foco
     */
    @Event() apolloBlur: EventEmitter<null>;

    /**
     * Habilita/Desabilita o estado desativado do componente
     */
    @Prop() disabled = false;

    /**
     * Indica se o componente está selecionado
     */
    @Prop({
        mutable: true,
    })
    checked = false;

    /**
     * nowrap
     */
    @Prop() nowrap = false;

    /**
     * Texto vinculado ao componente
     */
    @Prop() label = '';

    /**
     * Posição do texto com base no componente
     */
    @Prop() position: 'before' | 'after' = 'after';

    /**
     * API que modifica o valor do componente
     */
    @Method()
    async setChecked(checked: boolean) {
        this.switch.getDefaultFoundation().setChecked(checked);
        this.checked = checked;
    }

    /**
     * API que habilita/desabilita o componente
     */
    @Method()
    async setDisabled(disabled: boolean) {
        this.switch.getDefaultFoundation().setDisabled(disabled);
    }

    componentDidLoad() {
        this.formField = new MDCFormField(this.formFieldElement);
        this.switch = new MDCSwitch(this.switchElement);
        this.formField.input = this.switch;
    }

    private formFieldElementRef = (element: HTMLDivElement) => {
        this.formFieldElement = element;
    };

    private switchElementRef = (element: HTMLDivElement) => {
        this.switchElement = element;
    };

    private onChange = () => {
        this.checked = !this.checked;
        this.apolloChange.emit(this.checked);
    };

    private onBlur = () => {
        this.apolloBlur.emit();
    };

    render() {
        return (
            <Host>
                <div
                    class={classnames('mdc-form-field', {
                        'mdc-form-field--align-end': this.position === 'before',
                        'mdc-form-field--nowrap': this.nowrap,
                    })}
                    ref={this.formFieldElementRef}
                >
                    <div
                        class={classnames(`mdc-switch`, {
                            'mdc-switch--disabled': this.disabled,
                            'mdc-switch--checked': this.checked,
                        })}
                        ref={this.switchElementRef}
                    >
                        <div class="mdc-switch__track"></div>
                        <div class="mdc-switch__thumb-underlay">
                            <div class="mdc-switch__thumb"></div>
                            <input
                                type="checkbox"
                                class="mdc-switch__native-control"
                                role="switch"
                                id={`${this.rangeId}`}
                                aria-checked={this.checked}
                                checked={this.checked}
                                disabled={this.disabled}
                                onChange={this.onChange}
                                onBlur={this.onBlur}
                            />
                        </div>
                    </div>
                    {this.label.length > 0 && <label htmlFor={`${this.rangeId}`}>{this.label}</label>}
                </div>
            </Host>
        );
    }
}
