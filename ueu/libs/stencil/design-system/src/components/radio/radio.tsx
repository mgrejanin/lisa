import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, ComponentInterface } from '@stencil/core';

import classnames from 'classnames';

import { MDCFormField } from '@material/form-field';
import { MDCRadio } from '@material/radio';

@Component({
    tag: 'apollo-radio',
    styleUrl: 'radio.scss',
    shadow: false,
})
export class ApolloRadio implements ComponentInterface {
    private formField: MDCFormField;
    private formFieldElement: HTMLDivElement;
    private radioElement: HTMLDivElement;
    private radio: MDCRadio;
    private rangeId: number = Math.round(Math.random() * 99999);

    @Element() host: HTMLApolloRadioElement;

    /**
     * Evento disparado quando o valor do componente muda
     */
    @Event() apolloChange: EventEmitter<string>;

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
    @Prop() checked = false;

    /**
     * Indica se o componente está inválido
     */
    @Prop({
        reflect: true,
    })
    invalid = false;

    /**
     * Adiciona margens para display em inline
     */
    @Prop() inline = false;

    /**
     * nowrap
     */
    @Prop() nowrap = true;

    /**
     * Texto vinculado ao componente
     */
    @Prop() label = '';

    /**
     * Valor do componente
     */
    @Prop({
        reflect: true,
    })
    value = '';

    /**
     * Nome do componente para agrupar radio buttons em forms
     */
    @Prop() name = '';

    /**
     * Posição do texto com base no componente
     */
    @Prop() position: 'before' | 'after' = 'after';

    /**
     * API que habilita/desabilita o componente
     */
    @Method()
    async setDisabled(disabled: boolean) {
        this.radio.getDefaultFoundation().setDisabled(disabled);
    }

    componentDidLoad(): void {
        this.formField = new MDCFormField(this.formFieldElement);
        this.radio = new MDCRadio(this.radioElement);
        this.formField.input = this.radio;
    }

    private formFieldElementRef = (element: HTMLDivElement) => {
        this.formFieldElement = element;
    };

    private radioElementRef = (element: HTMLDivElement): void => {
        this.radioElement = element;
    };

    private onChange = () => {
        this.apolloChange.emit(this.value);
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
                        ref={this.radioElementRef}
                        class={classnames(`mdc-radio mdc-radio--touch`, {
                            'mdc-radio--disabled': this.disabled,
                            'mdc-radio--checked': this.checked,
                            'mdc-radio--invalid': this.invalid,
                        })}
                    >
                        <input
                            class="mdc-radio__native-control"
                            type="radio"
                            id={`${this.rangeId}`}
                            name={this.name}
                            value={this.value}
                            disabled={this.disabled}
                            checked={this.checked}
                            aria-checked={this.checked}
                            onChange={this.onChange}
                            onBlur={this.onBlur}
                        />
                        <div class="mdc-radio__background">
                            <div class="mdc-radio__outer-circle"></div>
                            <div class="mdc-radio__inner-circle"></div>
                        </div>
                        <div class="mdc-radio__ripple"></div>
                    </div>
                    {this.label && (
                        <label
                            htmlFor={`${this.rangeId}`}
                            class={classnames({
                                'radio-inline': this.inline,
                            })}
                        >
                            {this.label}
                        </label>
                    )}
                </div>
            </Host>
        );
    }
}
