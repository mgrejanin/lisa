export const listTransactionsMock = [
    {
        consumer: 'Gustavo Gama',
        transaction_date: '2020-06-19 12:03:52.000000',
        details: {
            cpf_cnpj: '49.447.667/0001-26',
            transaction_date: '2020-06-19 12:03:52.000000',
            id_seller: 475,
            id_transaction: 847530,
            operator: '-',
            price: 0,
            seller: 'Rotativo Vitória',
            username: 'gustavo.gama5',
        },
        id: 847530,
        image: '/assets/images/avatar.svg',
        price: 0,
        seller: 'Rotativo Vitória',
        status: 'Erro',
        status_id: 'error_outline',
        checkout: false,
    },
    {
        consumer: 'Junior Alves',
        transaction_date: '2020-06-19 12:03:52.000000',
        details: {
            cpf_cnpj: '49.447.667/0001-26',
            transaction_date: '2020-06-19 12:03:52.000000',
            id_seller: 475,
            id_transaction: 846691,
            operator: '-',
            price: 0,
            seller: 'Rotativo Vitória',
            username: 'juneba',
        },
        id: 846691,
        image: '/assets/images/avatar.svg',
        price: 0,
        seller: 'Rotativo Vitória',
        status: 'Completada',
        status_id: 'check_circle_outline',
        checkout: false,
    },
];

export const TableColumnsMock = ['consumer', 'date', 'id', 'unity', 'status', 'price', 'icon'];