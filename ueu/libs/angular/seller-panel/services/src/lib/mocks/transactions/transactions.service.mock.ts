import { TransactionTable } from '../../models';
import { of } from 'rxjs';

export const getTransactionsResponseMock: { total_count: number; items: TransactionTable[] } = {
    total_count: 10,
    items: [
        {
            image:
                'https://picpay-dev.s3.amazonaws.com/profiles-processed-images/d00c2e62c189f9f05c773a09ee2895fd.500.jpg',
            transaction_date: '2020-06-19 12:03:52.000000',
            consumer: 'Rodrigo Silva',
            id: 11,
            seller: 'Rotativo Vitória',
            status: 'Aprovada',
            status_id: 'P',
            price: 11000,
            details: {
                username: 'rodrigosilva',
                cpf_cnpj: '49.447.667/0001-26',
                transaction_date: '2020-06-19 12:03:52.000000',
                id_transaction: 111,
                seller: 'VixPark',
                id_seller: 1000,
                operator: 'Teste Operator',
                price: 11000,
            },
            store_details: {
                store_name: 'Uber',
                product_description: 'product_description_123',
                picpay_nsu: 1,
            },
            checkout: false,
        },
        {
            image:
                'https://picpay-dev.s3.amazonaws.com/profiles-processed-images/d00c2e62c189f9f05c773a09ee2895fd.500.jpg',
            transaction_date: '2020-06-19 12:03:52.000000',
            consumer: 'Thiago Rodrigues',
            id: 22,
            seller: 'Rotativo Vitória',
            status: 'Aprovada',
            status_id: 'P',
            price: 22000,
            details: {
                username: 'rodrigosilva',
                cpf_cnpj: '49.447.667/0001-26',
                transaction_date: '2020-06-19 12:03:52.000000',
                id_transaction: 222,
                seller: 'VixPark',
                id_seller: 1000,
                operator: 'Teste Operator',
                price: 11000,
            },
            store_details: {
                store_name: 'Uber',
                product_description: 'product_description_123w',
                picpay_nsu: 2,
            },
            checkout: false,
        },
        {
            image:
                'https://picpay-dev.s3.amazonaws.com/profiles-processed-images/d00c2e62c189f9f05c773a09ee2895fd.500.jpg',
            transaction_date: '2020-06-19 12:03:52.000000',
            consumer: 'Ellen Silva',
            id: 33,
            seller: 'Rotativo Vitória',
            status: 'Devolvida',
            status_id: 'P',
            price: 33000,
            details: {
                username: 'rodrigosilva',
                cpf_cnpj: '49.447.667/0001-26',
                transaction_date: '2020-06-19 12:03:52.000000',
                id_transaction: 333,
                seller: 'VixPark',
                id_seller: 1000,
                operator: 'Teste Operator',
                price: 11000,
            },
            store_details: {
                store_name: 'Uber',
                product_description: 'product_description_1234w',
                picpay_nsu: 3,
            },
            checkout: false,
        },
    ],
};

export class TransactionsServiceMock {
    getTransactions() {
        return of(getTransactionsResponseMock);
    }

    getExternLinkTransactions() {
        return of(getTransactionsResponseMock);
    }

    cancelTransaction(id, password) {
        return of({
            success: {
                status: 200,
                ok: true,
            },
            error: {
                message: 'Erro ao cancelar transação 483930',
                ok: false,
                status: 422,
                title: 'Ocorreu um erro ao cancelar a transação!',
            },
        });
    }

    exportTransactions(filters: any = {}) {
        if (filters?.request_type === 'EMAIL') {
            return of({
                email: 'gabrielhasilva@gmail.com',
            });
        }

        if (filters?.request_type === 'DOWNLOAD') {
            return of(new Blob(['a', 'b', '%', 'c', 'd', '@', 'objDate', '(D:20200728120039-03-00)']));
        }
    }
}
