export function isEmpty(value: string | number): boolean {
    if (!value) {
        return true;
    }

    return false;
}

export function getStringWithoutSpecialCharacters(value: string): string | null {
    if (isEmpty(value)) {
        return null;
    }

    const valueFormatted = value.replace(/[^\w\s]/gi, '');
    return valueFormatted;
}

export function getDataLikeYearMonthDay(date: string): string | null {
    if (isEmpty(date)) {
        return null;
    }

    const dateArr = date.split('/');

    const dateFormatted = `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
    return dateFormatted;
}

export function getNumberWithoutWhiteSpace(number: string): string | null {
    if (isEmpty(number)) {
        return null;
    }

    const numberFormatted = number.replace(' ', '');
    return numberFormatted;
}
