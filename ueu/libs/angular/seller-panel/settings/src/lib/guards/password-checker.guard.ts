import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate, Router } from '@angular/router';

import { RequestPasswordComponent } from '@picpay/seller-panel/shared';

@Injectable({
    providedIn: 'root',
})
export class PasswordCheckerGuard implements CanActivate {
    result: Promise<boolean>;

    constructor(private dialog: MatDialog, private router: Router) {}

    async openRequestPassword() {
        const dialogRef = this.dialog.open(RequestPasswordComponent, {
            panelClass: 'o-modal-reset',
            width: '490px',
            data: {
                caption: 'Para sua segurança, ao acessar as configurações da conta, por favor, digite sua senha.',
            },
            disableClose: true,
        });

        return dialogRef.afterClosed().toPromise();
    }

    async canActivate() {
        let checked = false;

        await this.openRequestPassword().then(result => {
            checked = result?.confirm;
        });

        if (!checked) {
            return this.router.parseUrl('/inicio');
        }

        return checked;
    }
}
