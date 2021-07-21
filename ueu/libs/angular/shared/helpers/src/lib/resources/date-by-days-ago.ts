import { resetISODateHour } from './date-reset-hour';
/**
 * Returns an ISO format date by your days ago. Default is 7 days ago.
 * @param days - Number of days ago
 * @param resetHour - Reset hour to 00:00:00
 */
export const getISODateByDaysAgo = (days = 7, resetHour = false): string => {
    const todayDate = new Date();
    const pastDate = new Date().getDate() - days;
    let resolvedDate = new Date(todayDate.setDate(pastDate)).toISOString();

    if (resetHour) {
        resolvedDate = resetISODateHour(resolvedDate);
    }

    return resolvedDate;
};
