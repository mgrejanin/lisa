import DesignSystem from 'design-system-utils';

import { ThemeConfig } from './../tokens';
import { TokenType } from './../interfaces/token.model';

type TYPE = keyof typeof ThemeConfig.type;
type FONT_WEIGHT = keyof typeof ThemeConfig.type.fontWeight;
type LINE_HEIGHT = keyof typeof ThemeConfig.type.lineHeight;
type OPACITY = keyof typeof ThemeConfig.opacity;
type BORDER_WIDTH = keyof typeof ThemeConfig.borderWidth;
type BORDER_RADIUS = keyof typeof ThemeConfig.borderRadius;
type BOX_SHADOW = keyof typeof ThemeConfig.boxShadow;
type TRANSITION = keyof typeof ThemeConfig.transition;
type LAYOUT = keyof typeof ThemeConfig.layout;
type SIZE = keyof typeof ThemeConfig.size;

export class ApolloDesignSystem extends DesignSystem<typeof ThemeConfig, { fontSizeUnit: 'rem' }> {
    /**
     * Retorna o objeto `fontWeight` dos tokens de Design System
     * @param prop Propriedade que será buscada nos tokens de `fontWeight`
     * @returns Alias para a função `.get('fontWeight...')`
     */
    public fontWeight(prop: string): FONT_WEIGHT {
        return this.get(`type.fontWeight.${prop}`);
    }

    /**
     * Retorna o objeto `lineHeight` dos tokens de Design System
     * @param prop Propriedade que será buscada nos tokens de `lineHeight`
     * @returns Alias para a função `.get('lineHeight...')`
     */
    public lineHeight(prop: string): LINE_HEIGHT {
        return this.get(`type.lineHeight.${prop}`);
    }

    /**
     * Retorna o objeto `type` dos tokens de Design System
     * @param prop Propriedade que será buscada nos tokens de `type`
     * @returns Alias para a função `.get('type...')`
     */
    public type(prop: string): TYPE {
        return this.get(`type.${prop}`);
    }

    /**
     * Retorna o objeto `opacity` dos tokens de Design System
     * @param prop Propriedade que será buscada nos tokens de `opacity`
     * @returns Alias para a função `.get('opacity...')`
     */
    public opacity(prop: string): OPACITY {
        return this.get(`opacity.${prop}`);
    }

    /**
     * Retorna o objeto `borderWidth` dos tokens de Design System
     * @param prop Propriedade que será buscada nos tokens de `borderWidth`
     * @returns Alias para a função `.get('borderWidth...')`
     */
    public borderWidth(prop: string): BORDER_WIDTH {
        return this.get(`borderWidth.${prop}`);
    }

    /**
     * Retorna o objeto `borderRadius` dos tokens de Design System
     * @param prop Propriedade que será buscada nos tokens de `borderRadius`
     * @returns Alias para a função `.get('borderRadius...')`
     */
    public borderRadius(prop: string): BORDER_RADIUS {
        return this.get(`borderRadius.${prop}`);
    }

    /**
     * Retorna o objeto `boxShadow` dos tokens de Design System
     * @param prop Propriedade que será buscada nos tokens de `boxShadow`
     * @returns Alias para a função `.get('boxShadow...')`
     */
    public boxShadow(prop: string): BOX_SHADOW {
        return this.get(`boxShadow.${prop}`);
    }

    /**
     * Retorna o objeto `transition` dos tokens de Design System
     * @param prop Propriedade que será buscada nos tokens de `transition`
     * @returns Alias para a função `.get('transition...')`
     */
    public transition(prop: string): TRANSITION {
        return this.get(`transition.${prop}`);
    }

    /**
     * Retorna o objeto `layout` dos tokens de Design System
     * @param prop Propriedade que será buscada nos tokens de `layout`
     * @returns Alias para a função `.get('layout...')`
     */
    public layout(prop: string): LAYOUT {
        return this.get(`layout.${prop}`);
    }

    /**
     * Retorna o objeto `size` dos tokens de Design System
     * @param prop Propriedade que será buscada nos tokens de `size`
     * @returns Alias para a função `.get('size...')`
     */
    public size(prop: string): SIZE {
        return this.get(`size.${prop}`);
    }

    /**
     * Retorna o token a partir do tipo
     * @param prop Propriedade que será buscada nos tokens do DS
     * @param type Tipo da propriedade, para saber qual função interna do DS que deverá ser chamada
     * @returns Valor final do token
     */
    getToken = (prop: string, type: TokenType) => {
        if (!prop) return;
        let token;
        switch (type) {
            case 'space':
                token = Apollo.spacing(prop);
                break;
            case 'color':
                token = Apollo.color(prop);

                if ((!prop.includes('contrast') && !prop.includes('base') )&& /\.\d+|(lightest|light|dark|darkest)+$/g.test(prop)) {
                    token = token.base; 
                }

                break;
            case 'brand':
                token = Apollo.brand(prop);
                break;
            case 'fontSize':
                token = Apollo.fs(prop);
                break;
            case 'z':
                token = Apollo.z(prop);
                break;
            case 'type':
                token = Apollo.type(prop);
                break;
            case 'fontWeight':
                token = Apollo.fontWeight(prop);
                break;
            case 'lineHeight':
                token = Apollo.lineHeight(prop);
                break;
            case 'opacity':
                token = Apollo.opacity(prop);
                break;
            case 'borderWidth':
                token = Apollo.borderWidth(prop);
                break;
            case 'borderRadius':
                token = Apollo.borderRadius(prop);
                break;
            case 'boxShadow':
                token = Apollo.boxShadow(prop);
                break;
            case 'transition':
                token = Apollo.transition(prop);
                break;
            case 'layout':
                token = Apollo.layout(prop);
                break;
            case 'size':
                token = Apollo.size(prop);
                break;
            default:
                token = Apollo.get(prop);
                break;
        }
        return token ? token : prop;
    };
}

export const Apollo = new ApolloDesignSystem(ThemeConfig);
