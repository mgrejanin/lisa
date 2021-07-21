import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { MockComponents } from 'ng-mocks';

import { ConfirmComponent } from '@picpay/seller-panel/shared';
import { MatDialogMock } from '@picpay/angular/shared/helpers';

import { MyDocumentsComponent } from '../components/my-documents/my-documents.component';
import { UnsavedChangesGuard } from './unsaved-changes.guard';

describe('UnsavedChangesGuard', () => {
    let guard: UnsavedChangesGuard;
    let dialog: MatDialog;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MockComponents(ConfirmComponent, MyDocumentsComponent)],
            providers: [
                {
                    provide: MatDialog,
                    useClass: MatDialogMock,
                },
                {
                    provide: ActivatedRouteSnapshot,
                    useValue: {
                        component: MyDocumentsComponent,
                        data: {},
                        params: {},
                    },
                },
                {
                    provide: RouterStateSnapshot,
                    useValue: {
                        url: '/current-url',
                    },
                },
                {
                    provide: RouterStateSnapshot,
                    useValue: {
                        url: '/next-url',
                    },
                },
            ],
        }).compileComponents();

        guard = TestBed.inject(UnsavedChangesGuard);
        dialog = TestBed.inject(MatDialog);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should openConfirmModal function', async (done: jest.DoneCallback) => {
        const dialogSpy = spyOn(dialog, 'open').and.callThrough();

        await guard.openConfirmModal().then(() => {
            done();
        });

        expect(dialogSpy).toHaveBeenCalledWith(ConfirmComponent, {
            panelClass: 'o-modal-reset',
            width: '530px',
            data: {
                title: 'Meus dados',
                subtitle: 'Deseja salvar os dados?',
                caption:
                    'Ei, você está saindo da página “Meus dados”. Deseja salvar as alterações que você fez até agora?',
                buttons: {
                    cancel: 'Sair sem salvar',
                    confirm: 'Sim, quero salvar',
                },
            },
        });
    });
});
