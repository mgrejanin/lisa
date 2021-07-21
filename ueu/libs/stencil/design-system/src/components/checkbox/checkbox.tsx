import { Component, ComponentInterface, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';
import classnames from 'classnames';

import { MDCCheckbox } from '@material/checkbox';
import { MDCFormField } from '@material/form-field';
@Component({
    tag: 'apollo-checkbox',
    styleUrl: 'checkbox.scss',
    shadow: false,
})
export class ApolloCheckbox implements ComponentInterface {
    private checkboxElement: HTMLDivElement;
    private formFieldElement: HTMLDivElement;
    private checkbox: MDCCheckbox;
    private formField: MDCFormField;
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
     * nowrap
     */
    @Prop() nowrap = true;

    /**
     * Habilita o estado inválido do input
     */
    @Prop({
        reflect: true,
    })
    invalid = false;

    /**
     * Habilita/Desabilita o estado indeterminado do componente
     */
    @Prop({ reflect: true }) indeterminate = false;

    /**
     * Indica se o componente está selecionado
     */
    @Prop() checked = false;

    /**
     * Referência do input nativo
     */
    @Prop({ reflect: true }) name: string;

    /**
     * Posição do texto com base no componente
     */
    @Prop() position: 'before' | 'after' = 'after';

    /**
     * API que habilita/desabilita o componente
     */
    @Method()
    async setDisabled(disabled: boolean) {
        this.checkbox.getDefaultFoundation().setDisabled(disabled);
    }

    componentDidLoad() {
        this.formField = new MDCFormField(this.formFieldElement);
        this.checkbox = new MDCCheckbox(this.checkboxElement);
        this.formField.input = this.checkbox;
    }

    private formFieldElementRef = (element: HTMLDivElement) => {
        this.formFieldElement = element;
    };

    private checkboxElementRef = (element: HTMLDivElement) => {
        this.checkboxElement = element;
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
                    <div class="mdc-touch-target-wrapper">
                        <div
                            class={classnames(`mdc-checkbox mdc-checkbox--touch`, {
                                'mdc-checkbox--disabled': this.disabled,
                                'mdc-checkbox--invalid': this.invalid,
                            })}
                            ref={this.checkboxElementRef}
                        >
                            <input
                                type="checkbox"
                                class="mdc-checkbox__native-control"
                                id={`${this.rangeId}`}
                                name={this.name}
                                aria-checked={this.checked}
                                checked={this.checked}
                                disabled={this.disabled}
                                onChange={this.onChange}
                                onBlur={this.onBlur}
                                data-indeterminate={this.indeterminate ? 'true' : 'false'}
                                // Usaremos o atributo acima dessa forma porque ele espera uma string 'true' | 'false'
                            />
                            <div class="mdc-checkbox__background">
                                <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                                    <path
                                        class="mdc-checkbox__checkmark-path"
                                        fill="none"
                                        d="M1.73,12.91 8.1,19.28 22.79,4.59"
                                    />
                                </svg>
                                <div class="mdc-checkbox__mixedmark"></div>
                            </div>
                            <div class="mdc-checkbox__ripple"></div>
                        </div>
                    </div>
                    <label htmlFor={`${this.rangeId}`}>
                        <slot></slot>
                    </label>
                </div>
            </Host>
        );
    }
}
