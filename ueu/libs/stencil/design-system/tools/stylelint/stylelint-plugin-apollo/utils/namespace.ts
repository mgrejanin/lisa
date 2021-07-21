const prefix = 'apollo-scss';

/**
 * Método que aciona prefixo apollo no nome das rules.
 *
 * Provendo um padrão de nomenclatura.
 */
export default function namespace(ruleName) {
    return `${prefix}/${ruleName}`;
}
