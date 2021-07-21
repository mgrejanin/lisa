import { of } from 'rxjs';

export class AutoWithdrawalServiceMock {
    getWithdrawalInfo(): void {
        of({});
    }

    updateCheck(check: boolean): void {}
}
