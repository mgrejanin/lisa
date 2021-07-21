import * as stylelint from 'stylelint';
import namespace from '../utils/namespace';
import spacingDeprecated from './../utils/spacing.deprecated';

const { utils } = stylelint;
const ruleName = namespace('spacing');
const messages = () =>
    utils.ruleMessages(ruleName, {
        expected: (unfixed, _) => `Token "${unfixed}" esta depreciado(a).`,
    });

/**
 * Regra para validar o uso de tokens spacing depreciados.
 */
export default function (_) {
    return function lint(postcssRoot, postcssResult) {
        const validOptions = utils.validateOptions(postcssResult, ruleName);

        if (!validOptions) {
            return;
        }

        postcssRoot.walkDecls(node => {
            const changes = spacingDeprecated;

            changes.map(c => {
                if (node.value.includes(c.key)) {
                    utils.report({
                        ruleName,
                        result: postcssResult,
                        message: messages().expected(c.key),
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
