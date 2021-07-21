/**
 * Verifica se existe tag proibida no array informado.
 */
const includesForbiddenTag = (arr, ocurrency) => arr.includes(ocurrency);

/**
 * Array que contempla tags a serem lintadas.
 */
const forbiddenTags = ['p', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

/**
 * Método retorna index da tag desejada.
 */
const getForbiddenTagsIndex = tag => forbiddenTags.indexOf(tag);

/**
 * Object literal que realiza de/para das tags nativas em relação a seus equivalentes no Apollo Design System.
 */
const getTagNameTranslate = {
    p: 'apollo-text',
    a: 'apollo-link',
    h1: 'apollo-heading',
    h2: 'apollo-heading',
    h3: 'apollo-heading',
    h4: 'apollo-heading',
    h5: 'apollo-heading',
    h6: 'apollo-heading',
};

const mountNodeLoc = node => {
    return {
        start: {
            line: node.sourceSpan.start.line + 1,
            column: node.sourceSpan.start.col,
        },
        end: {
            line: node.sourceSpan.end.line + 1,
            column: node.sourceSpan.end.col,
        },
    };
};

module.exports = {
    includesForbiddenTag,
    getForbiddenTagsIndex,
    mountNodeLoc,
    getTagNameTranslate,
    forbiddenTags,
};
