import { Component, h, Prop, Host, State } from '@stencil/core';

@Component({
    tag: 'apollo-progress-bar',
    styleUrl: 'progress-bar.scss',
    shadow: false,
})
export class ProgressBar {
    /**
     * Valor total, que equivale a 100% do progresso
     */
    @Prop()
    total: number;

    /**
     * Valor da fração, que equivale ao progresso atual
     */
    @Prop()
    fraction: number;

    /**
     * Valor do progresso em porcentagem
     */
    @State()
    progress: number;

    /**
     * Método para atualizar o valor de progresso
     */
    updateProgress() {
        const percentage = this.fraction <= this.total ? (this.fraction / this.total) * 100 : 100;
        this.progress = this.formatValue(percentage);
    }

    /**
     * Método para formatar o valor da porcentagem
     */
    formatValue(percentage: number) {
        const formatted = Intl.NumberFormat('pt-BR', {
            style: 'decimal',
            minimumIntegerDigits: 1,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(percentage);

        return parseInt(formatted);
    }

    componentDidLoad() {
        this.progress = 0;
    }

    componentDidUpdate() {
        this.updateProgress();
    }

    render() {
        return (
            <Host>
                <div class="apollo-progress-bar" role="progressbar">
                    <div class="apollo-progress-bar__container">
                        <span class="apollo-progress-bar__percentage">{this.progress}%</span>
                        <div class="apollo-progress-bar__bar">
                            <div class="apollo-progress-bar__fill" style={{ width: this.progress + '%' }}></div>
                        </div>
                    </div>
                </div>
            </Host>
        );
    }
}
