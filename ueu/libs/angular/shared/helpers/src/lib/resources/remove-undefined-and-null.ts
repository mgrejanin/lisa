/**
 * Returns an object without undefined, null or empty fields
 * @param object - Object to remove invalid fields
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const removeUndefinedNull = (object: object) => {
    const newObject = {};
    Object.keys(object).filter(param => {
        if (
            object[param] === undefined ||
            object[param] === null ||
            object[param] === '' ||
            (parseFloat(object[param]).toString() === object[param] && isNaN(object[param]))
        ) {
            return false;
        }
        newObject[param] = object[param];
    });

    return newObject;
};
