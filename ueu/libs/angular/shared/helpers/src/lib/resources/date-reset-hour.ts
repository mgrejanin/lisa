/**
 * Returns an ISO format date with first or last hour of the day
 * @param date - date in ISO format
 * @param lastHour - set hour to 00:00:00 or 23:59:59, default is 00:00:00
 */
export const resetISODateHour = (date: string, lastHour = false): string | null => {
    if (!date) {
        return null;
    }

    const splittedDate = date.split('T');

    return lastHour ? splittedDate[0].concat('T23:59:59') : splittedDate[0].concat('T00:00:00');
};
