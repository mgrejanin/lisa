import { Component, h, Prop, Host } from '@stencil/core';

type TComponent = string | object;

@Component({
    tag: 'lab-transformer',
    styleUrl: 'transformer.scss',
    shadow: true,
})
export class LabTransformer {
    /**
     * Estrutua do componente gerado
     */
    @Prop({
        reflect: false,
    })
    component: TComponent;

    /**
     * Seletor do componente gerado
     */
    selector = '';

    /**
     * Propriedades do componente gerado
     */
    props: any = {};

    getProperties(component) {
        const isObject = typeof component === 'object';
        return JSON.parse(isObject ? JSON.stringify(component) : component);
    }

    getSelector(props: any) {
        const hasWhitespace = props.type?.indexOf(' ') >= 0;
        return !hasWhitespace && props.type ? `lab-${props.type.trim()}` : '';
    }

    componentWillRender() {
        if (this.component) {
            this.props = this.getProperties(this.component);
            this.selector = this.getSelector(this.props);
        }
    }

    render() {
        return <Host>{this.component && this.selector && <this.selector {...this.props} />}</Host>;
    }
}
