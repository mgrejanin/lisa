import { of } from 'rxjs';

import { OperatorsResponse } from '../../models';

export class OperatorsServiceMock {
    getOperators() {
        return of<OperatorsResponse>({
            meta: {
                code: 200,
            },
            data: {
                list: [
                    {
                        id: 0,
                        username: 'Operator test',
                        checked: false,
                    },
                ],
            },
        });
    }
}
