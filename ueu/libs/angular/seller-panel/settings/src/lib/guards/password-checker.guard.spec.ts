import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { RequestPasswordComponent } from '@picpay/seller-panel/shared';
import { MatDialogMock } from '@picpay/angular/shared/helpers';

import { PasswordCheckerGuard } from './password-checker.guard';

describe('PasswordCheckerGuard', () => {
    let guard: PasswordCheckerGuard;
    let dialog: MatDialog;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                {
                    provide: MatDialog,
                    useClass: MatDialogMock,
                },
            ],
        });

        guard = TestBed.inject(PasswordCheckerGuard);
        dialog = TestBed.inject(MatDialog);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should openRequestPassword function', async (done: jest.DoneCallback) => {
        const dialogSpy = spyOn(dialog, 'open').and.callThrough();

        await guard.openRequestPassword().then(() => {
            done();
        });

        expect(dialogSpy).toHaveBeenCalledWith(RequestPasswordComponent, {
            panelClass: 'o-modal-reset',
            width: '490px',
            data: {
                caption: 'Para sua segurança, ao acessar as configurações da conta, por favor, digite sua senha.',
            },
            disableClose: true,
        });
    });

    it('should canActivate function when password is correct', async (done: jest.DoneCallback) => {
        const onRequestDialogSpy = spyOn(guard, 'openRequestPassword').and.returnValue(
            Promise.resolve({ confirm: true }),
        );

        await guard.canActivate().then(result => {
            expect(onRequestDialogSpy).toHaveBeenCalled();
            expect(result).toEqual(true);
            done();
        });
    });

    it('should canActivate function when password is incorrect', async (done: jest.DoneCallback) => {
        const onRequestDialogSpy = spyOn(guard, 'openRequestPassword').and.returnValue(
            Promise.resolve({ confirm: false }),
        );

        await guard.canActivate().then(result => {
            expect(result).toBeInstanceOf(UrlTree);
            expect(onRequestDialogSpy).toHaveBeenCalled();
            done();
        });
    });
});
