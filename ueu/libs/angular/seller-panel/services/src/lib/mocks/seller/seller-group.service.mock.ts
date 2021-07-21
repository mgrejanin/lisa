import { Observable, of } from 'rxjs';

import { SellerChangeProfileResponse, SellerChildrenProfile } from '../../models';

export const getSellersResponse: SellerChildrenProfile[] = [
    {
        id: 123,
        cpf_cnpj: '4444.4444.44.44.4',
        name: 'My Original Company',
    },
    {
        id: 123,
        cpf_cnpj: '4444.4444.44.44.4',
        name: 'My Company',
    },
];

export class SellerGroupServiceMock {
    getSellers(): Observable<SellerChildrenProfile[]> {
        return of<SellerChildrenProfile[]>([
            {
                id: 123,
                cpf_cnpj: '4444.4444.44.44.4',
                name: 'My Company',
            },
        ]);
    }

    changeSeller(id: number) {
        return of<SellerChangeProfileResponse>({
            token_transaction: '745f6ada-8d82-4483-9122-4b8b87a8f9d9',
            token_transaction_expires_in: '2020-07-30 12:57:58',
            token_refresh: 'd1b6a0e8-a1ae-486d-8e5b-89f0c8660ce0',
            token_refresh_expires_in: '2020-07-30 13:27:58',
            token_biz: '1ngB333GumIBaoeRwtdcfiRrdZiY1h6isIEJHLEw',
            seller: {},
            original_login_seller: {
                biometry: true,
                completed: true,
            },
            timezone: {
                timezone_type: 123,
                timezone: '',
            },
        });
    }
}
