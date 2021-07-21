import { of } from 'rxjs';

import { UpdateWithDrawalResponse } from '../../models';

export class WithdrawalsServiceMock {
    autoWithdrawal(param: boolean) {
        return of<UpdateWithDrawalResponse>({
            enabled: param,
            message: 'Saque automático ativado!',
        });
    }
}
