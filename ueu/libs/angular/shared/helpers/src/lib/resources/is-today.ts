/**
 * Returns a boolean saying if the date is today
 * @param date - date in string
 */
export function isToday(date: string): boolean {
    const dateNow = new Date();
    const dateNowISO = dateNow.toISOString().slice(0, -14);

    return dateNowISO === date;
}
