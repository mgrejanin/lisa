/**
 * Returns the difference between two Objects
 * @param firstObject - first object to compare
 * @param secondObject - second object to compare
 */
export const diffObjects = (
    firstObject: Record<string, unknown>,
    secondObject: Record<string, unknown>,
): Record<string, unknown> => {
    const diff = Object.keys(secondObject).reduce((_diff, key) => {
        if (firstObject[key] === secondObject[key]) {
            return _diff;
        }
        return {
            ..._diff,
            [key]: secondObject[key],
        };
    }, {});
    return diff;
};
