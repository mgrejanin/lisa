import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientSecret, CredentialsService, InfoCredential } from '@picpay/seller-panel/services';
import { catchError, filter, finalize, switchMap, tap } from 'rxjs/operators';
import { Clipboard } from '@angular/cdk/clipboard';
import { subscribeUntil } from '@picpay/angular/shared/helpers';
import { NotificationsService, SnackbarTypes } from '@picpay/angular/shared/core/notifications';
import { SellerPanelAuthService } from '@picpay/seller-panel/auth';
import { throwError } from 'rxjs';
import { ApolloDialog } from '@picpay/design-system-angular-components';

@Component({
    selector: 'seller-panel-credentials',
    templateUrl: './credentials.component.html',
    styleUrls: ['./credentials.component.scss'],
})
export class CredentialsComponent implements OnInit {
    @ViewChild('disableCredentialsDialog') disableCredentialsDialog: ApolloDialog;
    @ViewChild('updateSecretDialog') updateSecretDialog: ApolloDialog;

    isLoading = true;
    dialogLoading = false;
    haveCredential: string;
    hiddenData: boolean;
    clientId: string;
    projectName: string;
    clientSecret: string;
    disableCredential: boolean;

    constructor(
        private service: CredentialsService,
        private clipboard: Clipboard,
        private authService: SellerPanelAuthService,
        private notificationService: NotificationsService,
    ) {}

    ngOnInit(): void {
        this.getCredentials()
            .pipe(
                finalize(() => {
                    this.isLoading = false;
                }),
                switchMap((infoCredential: InfoCredential) => this.getClientSecret(infoCredential)),
            )
            .subscribe();
    }

    onLogout() {
        this.authService.logout();
    }

    getCredentials() {
        return this.service.getInfoCredential().pipe(
            filter((infoCredential: InfoCredential) => {
                if (!infoCredential.client_id) {
                    this.haveCredential = 'initial';
                    return false;
                }
                return true;
            }),
            tap((infoCredential: InfoCredential) => {
                this.clientId = infoCredential.client_id;
                this.projectName = infoCredential.name;
                this.disableCredential = !infoCredential.enabled;
                this.haveCredential = infoCredential.client_id && 'config';
            }),
            catchError(error => {
                this.haveCredential = 'error';
                return throwError(error);
            }),
        );
    }

    getClientSecret(infoCredential: InfoCredential) {
        return this.service.getClientSecret(infoCredential.client_id).pipe(
            tap((clientSecret: ClientSecret) => {
                this.clientSecret = clientSecret.client_secret;
            }),
        );
    }

    openDisableCredential(): void {
        this.disableCredentialsDialog.open();
    }

    enableCredential(): void {
        this.notificationService.openSnackbar('Ativando credencial...', SnackbarTypes.WARNING);

        this.service
            .enableCredential(this.clientId)
            .pipe(
                subscribeUntil(this),
                catchError(error => {
                    this.notificationService.openSnackbar(
                        'Não foi possível reativar a credencial. Tente novamente dentro de alguns minutos.',
                        SnackbarTypes.ERROR,
                    );
                    return throwError(error);
                }),
            )
            .subscribe(() => {
                this.disableCredential = false;
                this.getCredentials();
                this.notificationService.openSnackbar('Credencial ativada com sucesso', SnackbarTypes.DONE);
            });
    }

    openUpdateSecret(): void {
        this.updateSecretDialog.open();
    }

    onCancel(): void {
        this.disableCredentialsDialog.close() || this.updateSecretDialog.close();
    }

    onDisableSubmit(): void {
        this.notificationService.openSnackbar('Desativando credencial...', SnackbarTypes.WARNING);

        this.dialogLoading = true;
        this.service
            .disableCredential(this.clientId)
            .pipe(
                subscribeUntil(this),
                catchError(error => {
                    this.notificationService.openSnackbar(
                        'Não foi possível desativar a credencial. Tente novamente dentro de alguns minutos.',
                        SnackbarTypes.ERROR,
                    );
                    return throwError(error);
                }),
                finalize(() => {
                    this.dialogLoading = false;
                }),
            )
            .subscribe(() => {
                this.disableCredential = true;
                this.disableCredentialsDialog.close();
                this.notificationService.openSnackbar('Credencial desativada com sucesso', SnackbarTypes.DONE);
            });
    }

    onUpdateSubmit(): void {
        this.notificationService.openSnackbar('Gerando credencial...', SnackbarTypes.WARNING);

        this.dialogLoading = true;
        this.service
            .updateClientSecret(this.clientId)
            .pipe(
                subscribeUntil(this),
                catchError(error => {
                    this.notificationService.openSnackbar(
                        'Não foi possível alterar o Client_Secret. Tente novamente dentro de alguns minutos.',
                        SnackbarTypes.ERROR,
                    );
                    return throwError(error);
                }),
                finalize(() => {
                    this.dialogLoading = false;
                }),
            )
            .subscribe(response => {
                this.clientSecret = response.client_secret;
                this.updateSecretDialog.close();
                this.notificationService.openSnackbar('Client_Secret alterado', SnackbarTypes.DONE);
            });
    }

    copyToClipboard(code: string): void {
        const message = code === this.clientId ? `O Client_ID é: ${code}` : `O Client_Secret é: ${code}`;

        this.clipboard.copy(message);

        this.notificationService.openSnackbar('Copiado com sucesso!', SnackbarTypes.DONE);
    }
}
