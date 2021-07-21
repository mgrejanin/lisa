/**
 * convert GMT-0 time to GMT-3 in ISOString date
 * @param isoStringDate a ISOString date in yyyy-mm-ddThh:mm:ss.xxxxxxZ format
 * @returns a ISOString date formatted to time in GMT-3
 */
export const convertISOTimeToBrasilianTime = (isoStringDate: string): string => {
    const originalDate = isoStringDate.split('T');

    const isoDate = originalDate[0];
    const isoTime = originalDate[1];
    const isoSeconds = isoTime.split('.')[1];

    const brasilianHour = new Date(isoStringDate).toLocaleTimeString();
    const formattedDate = `${isoDate}T${brasilianHour}.${isoSeconds}`;

    return formattedDate;
};
