import { createPlugin } from 'stylelint';
import namespace from './utils/namespace';
import rules from './rules';

/**
 * Cria todas as regras exportadas dentro de `rules/`.
 */
const rulesPlugins = Object.keys(rules).map(ruleName => {
    return createPlugin(namespace(ruleName), rules[ruleName]);
});

export default rulesPlugins;
