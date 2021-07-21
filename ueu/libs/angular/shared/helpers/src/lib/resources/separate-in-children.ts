/**
 * Returns an Object groupped by childrens from array of childrens.
 * @param childrens - Array of fields to be group by name
 * @param obj - Object with all fields.
 * @example - separateInChildren(
 *              ['groupOne', 'groupTwo'],
 *              {
 *                  groupOne_field1,
 *                  groupTwo_field1,
 *              }
 *          );
 *
 *          Returns:
 *              {
 *                  groupOne: {
 *                      field1: 'value of the groupOne_field1'
 *                  }
 *                  groupOne: {
 *                      field1: 'value of the groupTwo_field1'
 *                  }
 *              }
 */
export const separateInChildren = (childrens: string[], object: Record<string, unknown>): Record<string, unknown> => {
    const data = {};

    childrens.map(masterProperty => {
        data[masterProperty] = {};
    });

    Object.keys(object).map(propertyName => {
        childrens.map(masterProperty => {
            if (propertyName.includes(masterProperty) && propertyName !== masterProperty) {
                const replacedProperty = propertyName.replace(masterProperty.toString().concat('_'), '');

                data[masterProperty][replacedProperty] = object[propertyName];
            }
        });
    });

    return data;
};
