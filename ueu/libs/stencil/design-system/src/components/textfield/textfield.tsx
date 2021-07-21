import { Component, Element, Event, EventEmitter, h, Host, Prop, State, Watch } from '@stencil/core';
import classnames from 'classnames';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { MDCTextField } from '@material/textfield';

import { TextFieldMaskEnum } from './textfield-mask.enum';
import { formatToCurrencyBRL, formatValue, maskInt, unsmakedValue } from './mask/mask';

@Component({
    tag: 'apollo-textfield',
    styleUrl: 'textfield.scss',
    shadow: false,
})
export class TextField {
    private mdcTextField: MDCTextField;
    private mdcTextFieldEl: HTMLLabelElement;
    private rangeId: number = Math.random() * 99999999;
    private typing: Subject<string> = new Subject();
    private labelElm: HTMLSpanElement;

    @Element() host: HTMLApolloTextfieldElement;

    /**
     * Evento disparado quando o usuário termina de digitar e o tempo de atraso de envio do evento for concluído
     */
    @Event() apolloChange: EventEmitter<string>;

    /**
     * Evento disparado quando o campo recebe foco
     */
    @Event() apolloFocus: EventEmitter<FocusEvent>;

    /**
     * Evento disparado quando o campo perde o foco
     */
    @Event() apolloBlur: EventEmitter<FocusEvent>;

    /**
     * Evento disparado quando o ponteiro está sob o componente
     */
    @Event() apolloPointerEnter: EventEmitter<PointerEvent>;

    /**
     * Evento disparado quando o ponteiro sai do componente
     */
    @Event() apolloPointerLeave: EventEmitter<PointerEvent>;

    /**
     * Ajusta a densidade do componente: 0 = normal, -4 = compacto
     */
    @State() dense: '-4' | '-1' = '-1';

    /**
     * Estado para identificar se existe texto no input
     */
    @State() hasValue: boolean;

    /**
     * Seta o valor do input
     */
    @Prop({ mutable: true })
    value: string;

    /**
     * Estilo do input
     */
    @Prop()
    variant: 'filled' | 'outlined' = 'outlined';

    /**
     * Tipo de dado do input | Estende os tipos em formato de texto do HTMLInput
     */
    @Prop({ reflect: true })
    type: 'text' | 'email' | 'password' | 'tel' | 'search' | 'number' | 'url' | 'date' = 'text';

    /**
     * Fornece uma dica para navegadores de dispositivos com teclados na tela para ajudá-los a decidir qual teclado exibir
     */
    @Prop({ reflect: true })
    inputmode: 'none' | 'text' | 'numeric' | 'tel' | 'decimal' | 'email' | 'url' | 'search' = 'text';

    /**
     * Id único do input
     */
    @Prop({
        reflect: true,
        attribute: 'id',
    })
    idElement = `text_field__${this.rangeId}`;

    /**
     * Referência do input nativo
     */
    @Prop({ reflect: true })
    name: string;

    /**
     * Label do input | Usado como placeholder ou float-label dependendo da configuração do componente
     */
    @Prop({ reflect: true })
    label: string;

    /**
     * Deixa o label apenas como placeholder
     */
    @Prop()
    noFloatingLabel = false;

    /**
     * Marca o campo como obrigatório e adiciona um * no final do label/placeholder
     */
    @Prop()
    required = false;

    /**
     * Habilita o estado desativado do input
     */
    @Prop()
    disabled = false;

    /**
     * Habilita o estado read-only do input
     */
    @Prop()
    readonly = false;

    /**
     * Habilita o estado inválido do input
     */
    @Prop({ mutable: true })
    invalid = false;

    /**
     * Habilita o estado válido do input
     */
    @Prop()
    success = false;

    /**
     * Texto de ajuda
     */
    @Prop()
    helperText: string;

    /**
     * Quando verdadeiro fixa a exibição do texto de ajuda mesmo que o campo não esteja em foco
     */
    @Prop()
    helperPersist = false;

    /**
     * Habilita a contagem de caracteres no canto inferior direito do input
     */
    @Prop()
    characterCounter = false;

    /**
     * Quando usado junto com o characterCounter ele limita a quantidade máxima de caracteres
     */
    @Prop({ mutable: true })
    maxLength: string;

    /**
     * Limita a quantidade minima de caracteres
     */
    @Prop()
    minLength: string;

    /**
     * Quando usado junto com o type: number ele limita o valor mínimo do campo nas
     * interações do usuário, mas não faz validação se o usuário digitar uma informação inválida
     */
    @Prop()
    min: string;

    /**
     * Quando usado junto com o type: number ele limita o valor máximo do campo nas
     * interações do usuário com os botões de ação do tipo numérico, mas não faz
     * validação se o usuário digitar uma informação inválida
     */
    @Prop()
    max: string;

    /**
     * Quando usado junto com o type: number ele altera o valor de incremento e
     * decremento nas interações do usuário com os botões de ação do tipo numérico
     */
    @Prop()
    step: string;

    /**
     * Ícone localizado na parte esquerda
     */
    @Prop()
    leadingIcon = false;

    /**
     * Ícone localizado na parte direita
     */
    @Prop()
    trailingIcon = false;

    /**
     * Ícone localizado na parte direita para limpar o input
     */
    @Prop()
    trailingClearIcon = false;

    /**
     * Texto fixo localizado antes do campo de input
     */
    @Prop()
    valuePrefix = '';

    /**
     * Texto fixo localizado após o campo de input
     */
    @Prop()
    valueSuffix = '';

    /**
     * Transforma o input em um textarea
     */
    @Prop({
        reflect: true,
    })
    textarea = false;

    /**
     * Quando usado junto com o textarea ele limita a quantidade de linhas que o campo de texto deverá ter
     */
    @Prop({
        reflect: false,
    })
    rows = 8;

    /**
     * Quando usado junto com o textarea ele limita a quantidade de colunas que o campo de texto deverá ter
     */
    @Prop({
        reflect: false,
    })
    cols = 40;

    /**
     * Para fins de performance o evento inputChange só é disparado em uma quantidade delimitada de tempo
     */
    @Prop()
    threshold = 200;

    /**
     * Ajusta o tamanho em altura do componente: sm = 36px, md = 48px
     */
    @Prop()
    size: 'sm' | 'md' = 'md';

    /**
     * Define as máscaras nas entradas
     */
    @Prop()
    mask: string;

    /**
     * Define os tipos de máscaras já estabelecidas
     * Formatos:
     * cep - 99999-999
     * date - 99/99/9999
     * cpf - 999.999.999-99
     * cnpj - 99.999.999/9999-99
     * tel - (99) 9999-9999
     * cel - (99) 99999-9999
     * currency - 999.999.999,99
     */
    @Prop()
    maskVariant: string | string[];

    /**
     * Value do input sem os caracteres especiais das máscaras
     * Caracteres a serem removidos:
     * -
     * /
     * (
     * )
     * .
     * :
     * space
     * +
     * ,
     * @
     * [
     * ]
     * "
     * '
     */
    @Prop({ mutable: true })
    unmaskedValue: string = '';

    @Watch('label')
    labelHandler() {
        if (!this.noFloatingLabel) {
            this.adjustFloatLabelWidth();
        }
    }
    @Watch('invalid')
    validHandler(newVal: boolean) {
        this.mdcTextField.valid = !newVal;
    }
    @Watch('success')
    successHandler() {
        this.mdcTextField.valid = true;
    }

    connectedCallback() {
        this.typing
            .asObservable()
            .pipe(debounceTime(this.threshold))
            .subscribe(() => {
                this.apolloChange.emit(this.value);
            });
    }

    componentWillLoad() {
        this.dense = this.size === 'sm' ? '-4' : '-1';
        this.hasValue = this.value?.length > 0;
    }

    componentDidLoad() {
        this.mdcTextField = new MDCTextField(this.mdcTextFieldEl);
        this.mdcTextField.valid = !this.invalid || this.success;
        this.mdcTextField.useNativeValidation = false;
    }

    componentDidRender() {
        if (this.value?.length > 0 && this.mdcTextField) {
            this.mdcTextField.value = this.value;
        }
    }

    disconnectedCallback() {
        this.typing.complete();
        this.mdcTextField.destroy();
    }

    /**
     * float label bug fix on dense
     */
    adjustFloatLabelWidth() {
        this.labelElm.style.width = 'auto';
        requestAnimationFrame(() => {
            this.labelElm.style.width = `${this.labelElm.scrollWidth + 1}px`;
        });
    }

    checkMinLength() {
        if (typeof this.minLength === 'undefined') {
            return;
        }

        if (this.value.length < Number(this.minLength)) {
            this.invalid = true;
            return;
        }

        this.invalid = false;
    }

    clearValue = () => {
        this.value = null;
        this.typing.next();
        this.hasValue = false;
        this.mdcTextField.focus();
    };

    handleTrailingIcon() {
        if (this.trailingClearIcon) {
            return (
                <apollo-textfield-icon
                    onClick={this.clearValue}
                    onApolloKeyUp={this.clearValue}
                    style={this.hasValue ? { visibility: 'visible' } : { visibility: 'hidden' }}
                >
                    <apollo-icon svgIcon="interface-times-square"></apollo-icon>
                </apollo-textfield-icon>
            );
        }

        return <slot name="trailing-icon"></slot>;
    }

    validInt(ev: KeyboardEvent) {
        if (!maskInt(ev)) {
            ev.returnValue = false;
        }
    }

    maxLengthUpdate(maxLength: string) {
        this.maxLength = maxLength;
    }

    maskApply(ev: KeyboardEvent, mask: string, maskLength: string) {
        this.validInt(ev);
        this.maxLengthUpdate(maskLength);
        this.mdcTextField.value = formatValue(this.mdcTextField.value, mask, ev);
    }

    handleChange(event) {
        this.value = event.target.value;
        this.typing.next();
        this.hasValue = this.mdcTextField.value !== '';
        this.checkMinLength();
        this.unmaskedValue = unsmakedValue(this.value);
    }

    mdcTextFieldElRef = elm => {
        this.mdcTextFieldEl = elm;
    };

    onInput = (ev: Event) => {
        this.handleChange(ev);
    };

    onFocus = (ev: FocusEvent) => {
        this.apolloFocus.emit(ev);

        if (!this.noFloatingLabel) {
            this.adjustFloatLabelWidth();
        }
    };

    onBlur = (ev: FocusEvent) => {
        this.apolloBlur.emit(ev);
    };

    onPointerEnter = (ev: PointerEvent) => {
        this.apolloPointerEnter.emit(ev);
    };

    onPointerLeave = (ev: PointerEvent) => {
        this.apolloPointerLeave.emit(ev);
    };

    onKeyPress(ev: KeyboardEvent) {
        if (this.mask) {
            const mask = this.mask;
            const maskLength = this.mask.length.toString();
            this.maskApply(ev, mask, maskLength);
            return;
        }

        if (typeof this.maskVariant === 'string' && this.maskVariant !== 'currency') {
            const mask = TextFieldMaskEnum[this.maskVariant];
            const maskLength = TextFieldMaskEnum[this.maskVariant].length.toString();
            this.maskApply(ev, mask, maskLength);
            return;
        }

        if (Array.isArray(this.maskVariant)) {
            const maskArraySorted = this.maskVariant.sort(
                (a, b) => TextFieldMaskEnum[a].length - TextFieldMaskEnum[b].length,
            );

            const mask =
                maskArraySorted.find(el => this.mdcTextField.value.length + 1 <= TextFieldMaskEnum[el].length) ||
                maskArraySorted.find(el => this.mdcTextField.value.length <= TextFieldMaskEnum[el].length);

            const maskLength = TextFieldMaskEnum[maskArraySorted[maskArraySorted.length - 1]].length.toString();

            this.maskApply(ev, TextFieldMaskEnum[mask], maskLength);
        }
    }

    onKeyUp() {
        if (this.maskVariant === 'currency') {
            const currentValue = this.value;

            this.mdcTextField.value = formatToCurrencyBRL(currentValue);
            this.value = formatToCurrencyBRL(currentValue);
        }
    }

    render() {
        return (
            <Host>
                <label
                    class={classnames('mdc-text-field', {
                        'mdc-text-field--outlined': this.variant === 'outlined',
                        'mdc-text-field--filled': this.variant === 'filled',
                        'mdc-text-field--success': this.success,
                        'mdc-text-field--disabled': this.disabled,
                        'mdc-text-field--no-label': this.noFloatingLabel,
                        'mdc-text-field--with-leading-icon': this.leadingIcon || this.type === 'search',
                        'mdc-text-field--with-trailing-icon': this.trailingIcon || this.trailingClearIcon,
                        'mdc-text-field--textarea': this.textarea,
                        'mdc-text-field--readonly': this.readonly,
                        [`mdc-text-field--dense-${this.dense}`]: this.dense?.length,
                    })}
                    ref={this.mdcTextFieldElRef}
                >
                    <span class="mdc-text-field__ripple"></span>

                    {this.type === 'search' ? (
                        <apollo-textfield-icon>
                            <apollo-icon svgIcon="interface-search" size="md"></apollo-icon>
                        </apollo-textfield-icon>
                    ) : (
                        <slot name="leading-icon"></slot>
                    )}

                    {this.valuePrefix?.length > 0 ? (
                        <span
                            class="mdc-text-field__affix mdc-text-field__affix--prefix"
                            innerHTML={this.valuePrefix}
                        ></span>
                    ) : null}
                    {!this.textarea ? (
                        <input
                            inputmode={this.inputmode}
                            type={this.type}
                            id={this.idElement}
                            class="mdc-text-field__input"
                            name={this.name}
                            required={this.required}
                            disabled={this.disabled}
                            min={this.min}
                            max={this.max}
                            step={this.step}
                            maxlength={this.maxLength}
                            minlength={this.minLength}
                            placeholder={this.noFloatingLabel || this.textarea ? this.label : ''}
                            value={this.value}
                            onInput={this.onInput}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            onKeyPress={(event: UIEvent) => this.onKeyPress((event as any) as KeyboardEvent)}
                            onKeyUp={() => this.onKeyUp()}
                            onPointerEnter={this.onPointerEnter}
                            onPointerLeave={this.onPointerLeave}
                            inputMode={this.maskVariant && 'numeric'}
                            pattern={this.maskVariant && '[0-9]*'}
                        />
                    ) : (
                        <textarea
                            id={this.idElement}
                            class="mdc-text-field__input"
                            name={this.name}
                            required={this.required}
                            disabled={this.disabled}
                            rows={this.rows}
                            cols={this.cols}
                            maxlength={this.maxLength}
                            minlength={this.minLength}
                            placeholder={this.noFloatingLabel ? this.label : ''}
                            value={this.value}
                            onInput={this.onInput}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            onPointerEnter={this.onPointerEnter}
                            onPointerLeave={this.onPointerLeave}
                        ></textarea>
                    )}
                    {this.variant === 'outlined' ? (
                        <span class="mdc-notched-outline">
                            <span class="mdc-notched-outline__leading"></span>
                            <span class="mdc-notched-outline__notch">
                                {!this.noFloatingLabel ? (
                                    <span
                                        class="mdc-floating-label"
                                        id={this.idElement}
                                        ref={(elm: HTMLSpanElement) => (this.labelElm = elm)}
                                    >
                                        {this.label}
                                    </span>
                                ) : null}
                            </span>
                            <span class="mdc-notched-outline__trailing"></span>
                        </span>
                    ) : !this.noFloatingLabel && !this.textarea ? (
                        <label class="mdc-floating-label">{this.label}</label>
                    ) : null}
                    {this.variant !== 'outlined' ? <span class="mdc-line-ripple"></span> : null}
                    {this.valueSuffix?.length > 0 ? (
                        <span
                            class="mdc-text-field__affix mdc-text-field__affix--suffix"
                            innerHTML={this.valueSuffix}
                        ></span>
                    ) : null}

                    {this.handleTrailingIcon()}
                </label>
                <div class="mdc-text-field-helper-line">
                    <textfield-helper-text
                        text={this.helperText}
                        persist={this.helperPersist}
                        invalid={this.invalid}
                    ></textfield-helper-text>
                    {this.characterCounter && this.maxLength && (
                        <textfield-character-counter></textfield-character-counter>
                    )}
                </div>
            </Host>
        );
    }
}
