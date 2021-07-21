export const initials = text =>
    text
        .match(/\b(\w)/g)
        .join('')
        .toLocaleUpperCase();
