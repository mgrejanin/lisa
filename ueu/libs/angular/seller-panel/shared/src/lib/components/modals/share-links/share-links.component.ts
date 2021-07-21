import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService, SnackbarTypes } from '@picpay/angular/shared/core/notifications';

import { ShareLinksConfig } from '../../../models/share-link.model';

@Component({
    selector: 'seller-panel-share-links',
    templateUrl: './share-links.component.html',
    styleUrls: ['./share-links.component.scss'],
})
export class ShareLinksComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: ShareLinksConfig,
        private dialogRef: MatDialogRef<ShareLinksComponent>,
        private notificationService: NotificationsService,
    ) {}

    onClose() {
        this.dialogRef.close();
    }

    onCopyLinkCallback(copied: boolean): void {
        if (copied) {
            this.notificationService.openSnackbar('Link de cobrança copiado com sucesso!', SnackbarTypes.DONE);
        } else {
            this.notificationService.openSnackbar(
                'Ocorreu um erro ao copiar o link de cobrança, tente novamente.',
                SnackbarTypes.ERROR,
            );
        }
    }
}
