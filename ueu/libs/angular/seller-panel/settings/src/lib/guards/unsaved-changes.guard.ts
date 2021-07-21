import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';

import { ConfirmComponent } from '@picpay/seller-panel/shared';

import { MyDocumentsComponent } from '../components/my-documents/my-documents.component';

@Injectable({
    providedIn: 'root',
})
export class UnsavedChangesGuard implements CanDeactivate<MyDocumentsComponent> {
    constructor(private dialog: MatDialog) {}

    async openConfirmModal() {
        const dialogRef = this.dialog.open(ConfirmComponent, {
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

        return dialogRef.afterClosed().toPromise();
    }

    async canDeactivate(
        component: MyDocumentsComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot,
    ) {
        let confirmed = false;

        if (component.hasChangedDataForm) {
            await this.openConfirmModal().then(result => {
                confirmed = result.confirm;

                if (confirmed) {
                    component.isChangeAndNavigateToURL = true;
                    component.nextUrlToNavigate = nextState.url;
                    component.onEditDocuments();
                }
            });
        }

        return !confirmed;
    }
}
