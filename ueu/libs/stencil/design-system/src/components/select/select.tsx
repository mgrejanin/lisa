import {
    Component,
    h,
    Host,
    Element,
    Event,
    ComponentInterface,
    EventEmitter,
    Prop,
    State,
    Watch,
} from '@stencil/core';
import classnames from 'classnames';

import { MDCSelect } from '@material/select';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    tag: 'apollo-select',
    styleUrl: 'select.scss',
    shadow: false,
})
export class ApolloSelect implements ComponentInterface {
    private selectElementRef: HTMLDivElement;
    private selectElement: MDCSelect;
    private rangeId: number = Math.random() * 99999999;
    private typing: Subject<string> = new Subject();
    private labelElm: HTMLSpanElement;

    @Element() host: HTMLApolloSelectElement;

    /**
     * Evento disparado quando o valor do componente muda
     */
    @Event() apolloChange: EventEmitter<string>;

    /**
     * Ajusta a densidade do componente: 0 = normal, -4 = compacto
     */
    @State() dense: '-4' | '-1' = '-1';

    /**
     * Seta o valor do Select
     */
    @Prop()
    value: any;

    /**
     * Estilo do Select
     */
    @Prop()
    variant: 'filled' | 'outlined' = 'outlined';

    /**
     * Id único do Select
     */
    @Prop({
        reflect: true,
        attribute: 'id',
    })
    idElement = `select__${this.rangeId}`;

    /**
     * Referência do Select nativo
     */
    @Prop({ reflect: true }) name: string;

    /**
     * Label do Select | Usado como placeholder ou float-label dependendo da configuração do componente
     */
    @Prop({ reflect: true }) label: string;

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
     * Habilita o estado desativado do Select
     */
    @Prop()
    disabled = false;

    /**
     * Habilita o estado inválido do Select
     */
    @Prop() invalid = false;

    /**
     * Habilita o estado válido do Select
     */
    @Prop() success = false;

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
     * Ícone localizado na parte esquerda
     */
    @Prop()
    leadingIcon = false;

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
     * Option do select padrão com valor vazio
     */
    @Prop()
    valueEmpty = false;

    @Watch('label')
    labelHandler() {
        this.adjustFloatLabelWidth();
    }
    @Watch('invalid')
    validHandler(newVal: boolean) {
        this.selectElement.valid = !newVal;
    }
    @Watch('success')
    successHandler() {
        this.selectElement.valid = true;
    }
    @Watch('value')
    setValue() {
        this.selectElement.value = this.value;
    }

    connectedCallback() {
        this.typing
            .asObservable()
            .pipe(debounceTime(this.threshold), distinctUntilChanged())
            .subscribe((value: string) => {
                this.apolloChange.emit(value);
                this.value = value;
            });
    }

    componentDidLoad() {
        /**
         * select
         */
        this.selectElement = new MDCSelect(this.selectElementRef);
        this.selectElement.valid = !this.invalid || this.success;

        this.selectElement.listen('MDCSelect:change', () => {
            this.handleChange();
        });
        if (this.value?.length > 0) {
            this.selectElement.value = this.value;
        }
    }

    componentDidRender() {
        /**
         * dense
         */
        this.dense = this.size === 'sm' ? '-4' : '-1';

        this.adjustFloatLabelWidth();
    }

    disconnectedCallback() {
        this.typing.complete();
        this.selectElement.destroy();
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

    private handleChange() {
        this.typing.next(this.selectElement.value);
    }

    private mdcSelectElRef = elm => {
        this.selectElementRef = elm;
    };

    render() {
        return (
            <Host>
                <div
                    class={classnames('mdc-select', {
                        'mdc-select--outlined': this.variant === 'outlined',
                        'mdc-select--filled': this.variant === 'filled',
                        'mdc-select--success': this.success,
                        'mdc-select--disabled': this.disabled,
                        'mdc-select--required': this.required,
                        'mdc-select--no-label': this.noFloatingLabel,
                        'mdc-select--with-leading-icon': this.leadingIcon,
                        [`mdc-select--dense-${this.dense}`]: this.dense?.length,
                    })}
                    ref={this.mdcSelectElRef}
                >
                    <div class="mdc-select__anchor" aria-required={this.required}>
                        <slot name="leading-icon"></slot>
                        {this.variant !== 'outlined' ? <span class="mdc-select__ripple"></span> : null}
                        <span class="mdc-select__selected-text"></span>
                        <span class="mdc-select__dropdown-icon">
                            <svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5">
                                <polygon
                                    class="mdc-select__dropdown-icon-inactive"
                                    stroke="none"
                                    fill-rule="evenodd"
                                    points="7 10 12 15 17 10"
                                ></polygon>
                                <polygon
                                    class="mdc-select__dropdown-icon-active"
                                    stroke="none"
                                    fill-rule="evenodd"
                                    points="7 15 12 10 17 15"
                                ></polygon>
                            </svg>
                        </span>
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
                        ) : !this.noFloatingLabel ? (
                            <span
                                class="mdc-floating-label"
                                id={this.idElement}
                                ref={(elm: HTMLSpanElement) => (this.labelElm = elm)}
                            >
                                {this.label}
                            </span>
                        ) : null}

                        {this.variant !== 'outlined' ? <span class="mdc-line-ripple"></span> : null}
                    </div>
                    <apollo-menu select>
                        <apollo-list>
                            {this.valueEmpty && <apollo-select-item value=""></apollo-select-item>}
                            <slot />
                        </apollo-list>
                    </apollo-menu>
                </div>
                <div class="mdc-text-field-helper-line mdc-select-helper-line">
                    <textfield-helper-text
                        text={this.helperText}
                        persist={this.helperPersist || this.invalid}
                        invalid={this.invalid}
                    ></textfield-helper-text>
                </div>
            </Host>
        );
    }
}
