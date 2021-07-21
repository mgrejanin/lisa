export const paramsTransaction = {
    sort: 'transaction_date',
    order: '-',
    page: 0,
    page_size: 12,
    filters: {},
};

export const body = {
    password: '123456',
    id: 33225,
    reason_id: '1',
    comment: 'Cancelamento',
};

export const bodyToEmail = {
    date_end: '2020-07-29T23:59:59',
    date_init: '2020-07-21T00:00:00',
    format_type: 'PDF',
    request_type: 'EMAIL',
};

export const bodyToDownload = {
    date_end: '2020-07-29T23:59:59',
    date_init: '2020-07-21T00:00:00',
    format_type: 'PDF',
    request_type: 'DOWNLOAD',
};
