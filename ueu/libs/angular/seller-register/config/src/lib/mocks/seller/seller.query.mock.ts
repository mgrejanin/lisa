import { Observable, of } from 'rxjs';
import { TypeToken } from '../../models/request.interceptor.model';

export class SellerQueryMock {
    readonly tokenHash$: Observable<Pick<TypeToken, 'hash' | 'token'>>;

    constructor(tokenValue: string = undefined) {
        this.tokenHash$ = of({ hash: 'testHASH', token: tokenValue });
    }
}
