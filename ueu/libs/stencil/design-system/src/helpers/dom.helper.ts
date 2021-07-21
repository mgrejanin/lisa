/**
 * Procura um nó pai pelo nome. Retorna `true` caso esse nó pai exista. Caso contrário, retornará `false`.
 * @param initialNode Nó inicial que começará a busca
 * @param parentNodeName Nome do nó que será procurado
 * @param deepness Quantos pais para cima serão procurados
 */
export const hasParentDOMNode = (initialNode: Node, parentNodeName: string, deepness = 5): boolean => {
    let nodeDeepness = deepness;
    let parentNode = initialNode.parentNode;
    while (parentNode && nodeDeepness !== 0) {
        if (parentNode.nodeName === parentNodeName) {
            return true;
        }
        nodeDeepness -= 1;
        parentNode = parentNode.parentNode;
    }
    return false;
};
