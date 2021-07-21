import { Component, Input } from '@angular/core';
import { InputTokens } from '@picpay/seller-panel/services';
import { NotificationsService, SnackbarTypes } from '@picpay/angular/shared/core/notifications';

@Component({
    selector: 'seller-panel-picpay-inputs-apis',
    templateUrl: './inputs-apis.component.html',
    styleUrls: ['./inputs-apis.component.scss'],
})
export class InputsApisComponent {
    @Input() title: string;
    @Input() tokens: InputTokens;

    hiddenToken: boolean;

    constructor(private notificationService: NotificationsService) {
        this.hiddenToken = false;
    }

    onCopyInputTokenCallback(copied: boolean, tokenType: string) {
        if (copied) {
            this.notificationService.openSnackbar(`Token ${tokenType} copiado com sucesso!`, SnackbarTypes.DONE);
        } else {
            this.notificationService.openSnackbar(`Não foi possível copiar o token ${tokenType}!`, SnackbarTypes.DONE);
        }
    }
}
