/**
 * check if the date is less or greather then 24 hours
 * @param date in ISOString
 * @returns boolean if the date is less or greather then 24hrs
 */
export const dateIsBiggerThan24Hours = (date: string): boolean => {
    const dateInNumbers = new Date(date).getTime();
    const timeStamp = Math.round(new Date().getTime() / 1000);
    const timeStampYesterday = timeStamp - 24 * 3600;
    const twentyFourHours = new Date(timeStampYesterday * 1000).getTime();

    return dateInNumbers > twentyFourHours;
};
