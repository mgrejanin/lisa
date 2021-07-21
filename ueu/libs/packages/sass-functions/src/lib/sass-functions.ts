/* eslint-disable @typescript-eslint/no-var-requires */
import * as sass from 'sass';
import { parseToRgb } from 'polished';
import { RgbaColor } from 'polished/lib/types/color';
import { parseUnit } from 'design-system-utils';

/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Apollo } from './helpers/design-system';
import { TokenType } from './interfaces/token.model';

const sassUtils = require('node-sass-utils')(sass);
const varTokenRegex = /var\(--.+, ?(.+)\)/;

/**
 * Grupo de funções utilitárias do SASS para ser usada nos bundlers
 */
export const sassFunctions = {
    /**
     * Converte a string dot-notation do token no seu respectivo valor
     *
     * @param keys Chave do token que será buscada
     *
     * @returns Valor convertido em SassDimensions
     *
     * @example <caption>Aplicando a variável de spacing ao sass:</caption>
     *
     *  ```scss
     *          .some-class {
     *              padding: theme('spacing.2');
     *          }
     *  ```
     */
    theme: (keys: sass.types.String) => {
        const { value, type } = typeByValue(keys.getValue());

        const token = Apollo.getToken(value, type);

        let returnValue: sass.types.String | sass.types.Number = new sass.types.String('');

        if (token && typeof token === 'string') {
            returnValue = convertStringToSassDimension(token);
        }

        if (token && typeof token === 'number') {
            returnValue = new sass.types.Number(token);
        }

        if (token && Array.isArray(token)) {
            returnValue = new sass.types.String(token.join(', '));
        }

        return sassUtils.castToSass(returnValue);
    },

    /**
     * Converte o token de cor do formato CSS Vars para Sass Dimensions
     * @param color Cor a ser convertida (Precisa estar em CSS Vars para ser convertida)
     * @returns Cor em Sass Dimension
     * @example <caption>Convertendo CSS Vars para cores nas dimensões do SASS.</caption>
     *
     *  ```scss
     *          .some-class {
     *              background-color: parseColor('var(--my-var, #000)');
     *          }
     *  ```
     */
    parseColor: (color: sass.types.String) => {
        try {
            const { token } = parseToken(color.getValue());
            const returnValue = convertStringToSassDimension(token);
            return sassUtils.castToSass(returnValue);
        } catch (e) {
            return sassUtils.castToSass(color);
        }
    },
};

/**
 * Converte o token para as dimensões do SASS
 * @param token Token original que será convertido
 * @returns Token convertido para as dimensões do SASS
 */
const convertStringToSassDimension = (token: string) => {
    /**
     * Converte a string para Sass.Color
     */
    if (token.indexOf('#') != -1 || token.indexOf('rgb') != -1 || token.indexOf('hsl') != -1) {
        try {
            const { red, green, blue, alpha } = parseToRgb(token) as RgbaColor;
            return new sass.types.Color(red, green, blue, alpha || 1);
        } catch (err) {
            return new sass.types.String(token);
        }
    }

    /**
     * Condição para garantir que a cor em CSS Vars seja convertida em Sass.String
     */
    if (token.indexOf('var') != -1) {
        return new sass.types.String(token);
    }

    /**
     * Condição para garantir que o valor seja convertido em Sass.Number mesmo se vier como string
     */
    if (/^([-]?[0-9]*\.?[0-9]+)$/gi.test(token)) {
        return new sass.types.Number(+token);
    }

    /**
     * Converte a string para SassDimension para poder ser manipulado dentro do Sass
     */
    const value = token.match(/([0-9.,-]+)/g)[0] || 0;
    const unit = parseUnit(token);
    return new sassUtils.SassDimension(+value, unit);
};

/**
 * Retorna o tipo e o valor tratado com base no valor de origem
 * @param value Valor do token para conversão
 * @returns Objeto com tipo e valor
 */
const typeByValue = (value: string) => {
    let type = TokenType.DEFAULT;

    if (value.indexOf('colors.') != -1) {
        type = TokenType.COLOR;

        value = value.replace('colors.', '');

        if (!value.includes('contrast') && /\.\d+|(lightest|light|dark|darkest)+$/g.test(value)) {
            value = `${value}.base`; 
        }
    }
    if (value.indexOf('spacing.') != -1) {
        type = TokenType.SPACE;
        value = value.replace('spacing.', '');
    }
    if (value.indexOf('fontSize.') != -1) {
        type = TokenType.FONT_SIZE;
        value = value.replace('fontSize.', '');
    }
    if (value.indexOf('fontFamily.') != -1) {
        type = TokenType.TYPE;
        value = value.replace('fontFamily.', '');
    }
    if (value.indexOf('lineHeight.') != -1) {
        type = TokenType.TYPE;
    }
    if (value.indexOf('fontWeight.') != -1) {
        type = TokenType.TYPE;
    }

    return {
        value,
        type,
    };
};

/**
 * Converte o token de cor em hexadecimal caso o parâmetro fixed seja passado
 * @param token Valor do token
 * @param fixed string
 * @returns Token convertido
 */
const parseToken = (token: string) => {
    if (varTokenRegex.test(token)) {
        token = token.match(varTokenRegex)[1];
    }
    return { token };
};
