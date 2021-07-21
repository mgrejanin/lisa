import { BatchShipment } from '../../models';

export const batchMock: BatchShipment = {
    name: 'Teste',
    end_date: new Date(),
    file: new File(
        [
            `cpf,valor
            60878150900,5.0
            62682245072,1.14
            37503102039,0.01
            46758682072,0.05
            06808190020,0.15
            29837507012,4.50
            02584415425,1.25
            51442563699,2.89`,
        ],
        'example_csv',
        { type: 'text/csv' },
    ),
    withdrawable: true,
};
