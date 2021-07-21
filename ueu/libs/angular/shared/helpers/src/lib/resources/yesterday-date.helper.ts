/**
 @returns A day before today
 */
export const getYesterdayDate = (): string => {
    const date = new Date();
    const yesterdayDate = new Date(date.setDate(date.getDate() - 1)).toISOString();

    return yesterdayDate;
};
