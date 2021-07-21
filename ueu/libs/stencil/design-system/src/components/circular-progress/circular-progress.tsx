import { Component, Element, h, Host, Method, Prop, State } from '@stencil/core';
import classNames from 'classnames';

import { MDCCircularProgress } from '@material/circular-progress';

export interface CircularProgressSize {
    radius?: number;
    stroke?: number;
    size?: number;
}

@Component({
    tag: 'apollo-circular-progress',
    styleUrl: 'circular-progress.scss',
    shadow: false,
})
export class ApolloCircularProgress {
    private circularProgress: MDCCircularProgress;

    @Element() host: HTMLApolloCircularProgressElement;

    @State() size: number;

    /**
     * Deixa o componente em estado fixo
     */
    @Prop({ mutable: true }) determinate = false;

    /**
     * Tamanho do progresso. Min: 0 | Max: 1
     */
    @Prop({ mutable: true }) progress = 1;

    /**
     * Raio do circulo
     */
    @Prop() radius = 8.75;

    /**
     * Largura da linha
     */
    @Prop() stroke = 2.5;

    /**
     * Aplica a cor branca na linha
     */
    @Prop() invert = false;

    /**
     * Texto de ajuda para acessibilidade
     */
    @Prop() label = '';

    /**
     * API para deixar o estado fixo ou não
     * @param determinate boolean
     */
    @Method()
    async setDeterminate(determinate: boolean) {
        this.circularProgress.determinate = determinate;
        this.determinate = determinate;
    }

    /**
     * API para setar o progresso do circulo
     * @param progress number
     */
    @Method()
    async setProgress(progress: number) {
        this.circularProgress.progress = progress;
        this.progress = progress;
    }

    componentWillRender() {
        this.size = this.radius * 2 + this.stroke * 2;
    }

    componentDidLoad() {
        this.circularProgress = new MDCCircularProgress(this.host.querySelector('.mdc-circular-progress'));
        this.circularProgress.determinate = this.determinate;
        this.circularProgress.progress = this.progress;
    }

    disconnectCallback() {
        this.circularProgress.destroy();
    }

    render() {
        return (
            <Host
                class={classNames({
                    '--invert': this.invert,
                })}
                style={{
                    width: `${this.size}px`,
                    height: `${this.size}px`,
                }}
            >
                <div
                    class="mdc-circular-progress"
                    style={{
                        width: `${this.size}px`,
                        height: `${this.size}px`,
                    }}
                    role="progressbar"
                    aria-label={this.label}
                    aria-valuemin="0"
                    aria-valuemax="1"
                >
                    <div class="mdc-circular-progress__determinate-container">
                        <svg
                            class="mdc-circular-progress__determinate-circle-graphic"
                            viewBox={`0 0 ${this.size} ${this.size}`}
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                class="mdc-circular-progress__determinate-circle"
                                cx={this.size * 0.5}
                                cy={this.size * 0.5}
                                r={this.radius}
                                stroke-dasharray={Math.PI * (this.radius * 2)}
                                stroke-dashoffset={Math.PI * (this.radius * 2)}
                                stroke-width={this.stroke}
                            />
                        </svg>
                    </div>
                    <div class="mdc-circular-progress__indeterminate-container">
                        <div class="mdc-circular-progress__spinner-layer">
                            <div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left">
                                <svg
                                    class="mdc-circular-progress__indeterminate-circle-graphic"
                                    viewBox={`0 0 ${this.size} ${this.size}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx={this.size * 0.5}
                                        cy={this.size * 0.5}
                                        r={this.radius}
                                        stroke-dasharray={Math.PI * (this.radius * 2)}
                                        stroke-dashoffset={Math.PI * this.radius}
                                        stroke-width={this.stroke}
                                    />
                                </svg>
                            </div>
                            <div class="mdc-circular-progress__gap-patch">
                                <svg
                                    class="mdc-circular-progress__indeterminate-circle-graphic"
                                    viewBox={`0 0 ${this.size} ${this.size}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx={this.size * 0.5}
                                        cy={this.size * 0.5}
                                        r={this.radius}
                                        stroke-dasharray={Math.PI * (this.radius * 2)}
                                        stroke-dashoffset={Math.PI * this.radius}
                                        stroke-width={this.stroke}
                                    />
                                </svg>
                            </div>
                            <div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right">
                                <svg
                                    class="mdc-circular-progress__indeterminate-circle-graphic"
                                    viewBox={`0 0 ${this.size} ${this.size}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx={this.size * 0.5}
                                        cy={this.size * 0.5}
                                        r={this.radius}
                                        stroke-dasharray={Math.PI * (this.radius * 2)}
                                        stroke-dashoffset={Math.PI * this.radius}
                                        stroke-width={this.stroke}
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </Host>
        );
    }
}
