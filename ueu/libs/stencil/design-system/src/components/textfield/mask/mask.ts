/**
 * Validação do input para numéricos inteiros
 * @param ev
 * @returns boolean
 */
export function maskInt(ev: KeyboardEvent) {
    if (ev.keyCode < 48 || ev.keyCode > 57) {
        ev.returnValue = false;
        return false;
    }
    return true;
}

/**
 * Remove a máscara do valor passado como paramêtro
 * @param value
 * @returns string
 */
export function unsmakedValue(value: string) {
    const unsmakedValue = value.replace(/\-|\/|\(|\)|\.|\:|\+|\,|\@|\[|\]|\"|\'| /g, '').replace(/^0+/, '');
    return unsmakedValue;
}

/**
 * Formata o valor passado como paramêtro para o formato BRL
 * @param value
 * @returns string
 */
export function formatToCurrencyBRL(value: string) {
    let newField = value.replace(/[^\d]/g, '');

    if (newField.length <= 1) {
        newField = '0' + value;
    }

    const unmaskedField = newField.toString().replace(/[^\d]/g, '');
    const decimalField = parseFloat(unmaskedField.replace(/([0-9]{2})$/, '.$1')).toFixed(2);
    const realFormat = decimalField.replace(/\./g, ',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.');

    return realFormat;
}

/**
 * Formata o valor passado como paramêtro para o formato fornecido através da máscara
 * @param value
 * @param mask
 * @param ev
 * @returns string
 */
export function formatValue(value: string, mask: string, ev: KeyboardEvent) {
    var boolMask;
    var digitate = ev.keyCode;
    var fieldNumbers = value.toString().replace(/\-|\.|\/|\(|\)| /g, '');

    var positionField = 0;
    var newValueField = '';
    var sizeMask = fieldNumbers.length;

    if (digitate != 8) {
        for (let i = 0; i <= sizeMask; i++) {
            boolMask = mask.charAt(i) == '-' || mask.charAt(i) == '.' || mask.charAt(i) == '/';
            boolMask = boolMask || mask.charAt(i) == '(' || mask.charAt(i) == ')' || mask.charAt(i) == ' ';

            if (boolMask) {
                newValueField += mask.charAt(i);
                sizeMask++;
            } else {
                newValueField += fieldNumbers.charAt(positionField);
                positionField++;
            }
        }

        return newValueField;
    }
}
