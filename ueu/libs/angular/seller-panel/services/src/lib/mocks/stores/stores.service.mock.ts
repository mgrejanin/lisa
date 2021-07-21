import { of } from 'rxjs';

import { StoresResponse } from '../../models/transactions/stores-response.model';

export class StoresServiceMock {
    getStores() {
        return of<StoresResponse[]>([
            {
                id: '123456',
                name: 'Telessena',
                checked: true,
            },
            {
                id: '123457',
                name: 'Ultragaz',
                checked: false,
            },
        ]);
    }
}
