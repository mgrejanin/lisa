import { Observable, of } from 'rxjs';

import { B2PExtractProjects, Extract } from '../../models';

export class ExtractServiceMock {
    getExtract(): Observable<Extract> {
        return of({
            show_receivables_onboarding: true,
            future_releases: {
                date: '2020-12-15',
                value: 9.7,
            },
            extract: [
                {
                    header: {
                        date: '2020-12-11',
                        balance: 9629.54,
                    },
                    itens: [
                        {
                            title: 'Pagamento via PIX',
                            description: 'Pagamento realizado',
                            type_item: 'output',
                            value: -20,
                            type_transaction: 'pix_transfer',
                            status: 'finished',
                            day: '2020-12-11',
                            fee: 0,
                        },
                    ],
                },
                {
                    header: {
                        date: '2020-12-10',
                        balance: 9713.87,
                    },
                    itens: [
                        {
                            title: 'Pagamento via PIX',
                            description: 'Pagamento realizado',
                            type_item: 'output',
                            value: -9.99,
                            type_transaction: 'pix_transfer',
                            status: 'finished',
                            day: '2020-12-10',
                            fee: 0,
                        },
                    ],
                },
                {
                    header: {
                        date: '2020-12-09',
                        balance: 9990,
                    },
                    itens: [
                        {
                            title: 'Pagamento via PIX',
                            description: 'Pagamento realizado',
                            type_item: 'output',
                            value: -0.01,
                            type_transaction: 'pix_transfer',
                            status: 'finished',
                            day: '2020-12-09',
                            fee: 0,
                        },
                    ],
                },
            ],
            pagination: {
                current_page: 1,
                per_page: 10,
                last_date: '2020-12',
                next_page: 2,
            },
        });
    }

    getExtractProjects(): Observable<B2PExtractProjects[]> {
        return of([
            {
                project_id: '606b7846f4a7cf198d528092',
                started_at: '2021-02-22T12:40:00.000000Z',
                ended_at: '2021-04-27T13:50:00.000000Z',
                name: 'Projeto Teste01',
                description: 'TESTE01:\n- Criar novo Projeto',
                updated_at: '2021-04-05T20:51:18.722000Z',
                created_at: '2021-04-05T20:51:18.722000Z',
            },
            {
                project_id: '60993ac1665112254c2372fe',
                started_at: '2021-03-22T12:40:00.000000Z',
                ended_at: '2021-05-27T13:50:00.000000Z',
                name: 'Projeto Teste02',
                description: 'TESTE02:\n- Criar novo Projeto',
                updated_at: '2021-05-10T20:51:18.722000Z',
                created_at: '2021-05-10T20:51:18.722000Z',
            },
        ]);
    }

    getFutureReleases() {
        return of([]);
    }

    getWalletBalance() {
        return of({
            data: {
                available_balance: 0,
            },
        });
    }

    exportExtract(filters: any = {}) {
        return of(null);
    }

    downloadExtract(): Observable<Blob> {
        return of(downloadExtractBlobSucess);
    }

    finishOnboarding(): Observable<{}> {
        return of({});
    }
}

export const downloadExtractBlobSucess = new Blob(
    [
        `transaction_id,payee_tax,value,status,transaction_date
        0,46758682072,0.23,FAILED,"2021-03-31 18:13:35"
        0,22233366631,0.32,FAILED,"2021-03-31 18:13:35"`,
    ],
    { type: 'text/csv' },
);

export const downloadExtractBlobError = new Blob(
    [
        JSON.stringify({
            message: {
                code: 404,
                message: 'Não há transferências para o projeto ou periodicidade informada.',
            },
        }),
    ],
    { type: 'application/json' },
);
