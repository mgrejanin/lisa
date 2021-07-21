import { ChargeTransaction } from '../../models/charge/charge.model';
import { of } from 'rxjs';

export class ChargeServiceMock {
    getChargeTransaction(payload: { value: string; fixed_value: boolean; token_biz: string }) {
        return of<ChargeTransaction>({
            data: {
                key: `http://app.picpay.com/payment?type=store&sellerId=0000&value=${payload.value}&fixed_value=${payload.fixed_value}`,
                paymentLink: '',
            },
        });
    }

    downloadQrCode(token_biz: string) {
        return of('');
    }
}
