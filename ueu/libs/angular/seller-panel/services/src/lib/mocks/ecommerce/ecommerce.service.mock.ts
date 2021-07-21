import { of } from 'rxjs';

import { PlanResponse } from '../../models';
import { Tokens } from '../../models/integrations/tokens.model';
import { UpdatePlanResponse } from '../../models/ecommerce/update-plan.model';

export class EcommerceServiceMock {
    getTokens() {
        return of<Tokens>({
            x_picpay_token: '43624ac7-9d07-4ced-9c7e-e12cecf92d84',
            application_key: '6b5f9c48-df61-4786-ac83-22e356450ef7',
            application_token: '43624ac7-9d07-4ced-9c7e-e12cecf92d84',
            x_seller_token: 'a0579b00-533e-484b-b7a0-0fa191db0844',
        });
    }

    getPlans() {
        return of<PlanResponse[]>([
            {
                id: '5b3f91315efe320b080fb4a2',
                name: '1 dia',
                description: 'Receba seus pagamentos em um dia, com apenas uma taxa de 5,89%.',
                days_to_withdrawal: 1,
                fee: 5.89,
                has_grace_period: true,
                grace_period: 90,
            },
            {
                id: '5b3f91315efe320b080fb4a3',
                name: '14 dias',
                description: 'Receba seus pagamentos em 14 dias, com apenas uma taxa de 4,89%.',
                days_to_withdrawal: 14,
                fee: 4.89,
                has_grace_period: true,
                grace_period: 90,
            },
            {
                id: '5b3f91315efe320b080fb4a4',
                name: '30 dias',
                description: 'Receba seus pagamentos em 30 dias, com apenas uma taxa de 3,89%.',
                days_to_withdrawal: 30,
                fee: 3.89,
                has_grace_period: true,
                grace_period: 90,
            },
        ]);
    }

    generateTokens() {
        return of<Tokens>({
            x_picpay_token: '43624ac7-9d07-4ced-9c7e-e12cecf92d84',
            application_key: '6b5f9c48-df61-4786-ac83-22e356450ef7',
            application_token: '43624ac7-9d07-4ced-9c7e-e12cecf92d84',
            x_seller_token: 'a0579b00-533e-484b-b7a0-0fa191db0844',
        });
    }

    setPlan(idPlain: string) {
        return of<UpdatePlanResponse>({
            organization: {
                id: 14336,
                name: 'loja do joão 3',
                razaoSocial: 'joão razão social',
                nomeFantasia: 'joão fantasia',
                image: null,
                cpfCnpj: '00000000000103',
                email: 'joao.casteluber@picpay.com',
                type: 'ecommerce',
                pessoaFisica: true,
                phone: '+55 27 988020195',
                category: {
                    id: 2,
                    name: 'Arte e Antiguidades',
                },
            },
            ecommerce: {
                storeUrl: 'http://www.picpay.com',
                forcePrivateFeed: false,
                daysForPayment: 7,
                planId: '5b3f91315efe320b080fb4a3',
            },
            responsible: {
                cpf: '11772551708',
                name: 'joao gabriel casteluber laass',
                birthDate: '1988-03-12',
                motherName: 'maria auxiliadora casteluber',
                phone: '+55 27 988020195',
            },
            address: {},
            plan: {
                id: 14302,
                name: '1 dia',
                daysToWithdrawal: 14,
                fee: 4.89,
            },
        });
    }
}
