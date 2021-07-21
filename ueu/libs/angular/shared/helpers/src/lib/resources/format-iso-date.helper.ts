/**
 * format a ISO date to brazilian date format
 * @param isoDate format ISO date to dd.mm.yyyy
 * @param formatHour format ISO time to hh:mm
 * @returns a date in (dd.mm.yyyy) or (dd.mm.yyyy - hh:mm) format
 */
export const formatISODate = (isoDate: string, formatHour?: boolean): string => {
    let formattedHour: string;

    const date = isoDate.split('T')[0].split('-');
    const formattedDate = `${date[2]}.${date[1]}.${date[0]}`;

    if (formatHour) {
        formattedHour = isoDate.split('T')[1].split('.')[0].split(':').slice(0, 2).join(':');
    }

    return formatHour ? `${formattedDate} - ${formattedHour}` : formattedDate;
};
