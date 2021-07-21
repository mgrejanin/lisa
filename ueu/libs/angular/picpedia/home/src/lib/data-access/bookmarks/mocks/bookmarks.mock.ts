import { Bookmark } from '../../../models';

export const mockBookmarks: Bookmark[] = [
    {
        cluster: 'picpay-datalake',
        database: 'glue',
        description: 'Proveniente de uma tabela no Google Sheets que informa o OKR de Chargeback Liquido',
        key: '',
        last_updated_timestamp: null,
        name: 'back_office_chargebacks',
        schema: 'prevention',
        type: 'table',
    },
    {
        cluster: 'picpay-datalake',
        database: 'glue',
        description: `Tabela analítica criada para gerar os OKR's da vertical de Conta PJ & Expansão.`,
        key: '',
        last_updated_timestamp: null,
        name: 'healthy_mas_mat_pj',
        schema: 'sellers',
        type: 'table',
    },
];
