import * as stylelint from 'stylelint';
import namespace from '../utils/namespace';
​
const parseColorfn = [{ key: 'parseColor', type: 'função' }];
const { utils } = stylelint;
const ruleName = namespace('parseColor');
const messages = (item: string) =>
    utils.ruleMessages(ruleName, {
        expected: (unfixed, _) => `A ${item} "${unfixed}" esta depreciada.`,
    });
​
/**
 * Regra para validar o uso da funcão `parseColor()`.
 */
export default function (_) {
    return function lint(postcssRoot, postcssResult) {
        const validOptions = utils.validateOptions(postcssResult, ruleName);
​
        if (!validOptions) {
            return;
        }
​
        postcssRoot.walkDecls(node => {
            const changes = parseColorfn;
​
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
​
                return;
            });
​
            return;
        });
    };
}
