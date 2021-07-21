/* eslint-disable @typescript-eslint/ban-types */
/**
 * Check if object is empty
 * @param obj - object to check
 */
export const isEmptyObject = (obj: object): boolean => {
    for (const key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
};
