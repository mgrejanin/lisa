export function ObjectIsEqual(objCurrency: unknown, compareWith: unknown): boolean | null {
    if (!objCurrency || !compareWith) {
        return null;
    }
    return JSON.stringify(objCurrency) === JSON.stringify(compareWith);
}
