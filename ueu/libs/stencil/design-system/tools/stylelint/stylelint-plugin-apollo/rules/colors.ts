import * as stylelint from 'stylelint';
import namespace from '../utils/namespace';
import colorsDeprecated from './../utils/colors.deprecated';

const { utils } = stylelint;
const ruleName = namespace('colors');
const messages = (item: 'cor' | 'token') =>
    utils.ruleMessages(ruleName, {
        expected: (unfixed, _) => `${item} "${unfixed}" esta depreciado(a).`,
    });

/**
 * Regra para validar o uso de tokens colors depreciados.
 */
export default function (_) {
    return function lint(postcssRoot, postcssResult) {
        const validOptions = utils.validateOptions(postcssResult, ruleName);

        if (!validOptions) {
            return;
        }

        postcssRoot.walkDecls(node => {
            const changes = colorsDeprecated;

            changes.map(c => {
                if (node.value.includes(c.key)) {
                    utils.report({
                        ruleName,
                        result: postcssResult,
                        message: messages(c.type).expected(c.key),
                        node: node,
                        word: c.key,
                    });
                }

                return;
            });

            return;
        });
    };
}
