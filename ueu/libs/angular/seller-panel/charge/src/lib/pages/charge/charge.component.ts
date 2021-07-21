import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import * as FileSaver from 'file-saver';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { EventTracking } from '@picpay/event-tracking';
import { getErrorMessage } from '@picpay/seller-panel/helpers';
import { ChargeService, ChargeTransaction, EventTrackingService } from '@picpay/seller-panel/services';
import { Links, ShareLinksComponent } from '@picpay/seller-panel/shared';
import { Unsubscriber } from '@picpay/angular/shared/helpers';

import { ChargeValueModalComponent } from '../../components/charge-value-modal/charge-value-modal.component';
import { NotificationsService, SnackbarTypes } from '@picpay/angular/shared/core/notifications';
import { SellerPanelAuthService } from '@picpay/seller-panel/auth';
@Component({
    selector: 'seller-panel-charge',
    templateUrl: './charge.component.html',
    styleUrls: ['./charge.component.scss'],
})
export class ChargeComponent implements OnInit {
    socialNetworks: Links[];

    isLoading: boolean;
    isLoadingPDF: boolean;
    isLoadFailed: boolean;

    chargeContent: ChargeTransaction;
    chargeValue: number;

    isMobile$: Observable<boolean>;

    @Unsubscriber() private readonly unsubscribe$: Subject<void>;

    constructor(
        private chargeService: ChargeService,
        private dialog: MatDialog,
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer,
        private notificationService: NotificationsService,
        private breakpointObserver: BreakpointObserver,
        private authService: SellerPanelAuthService,
        private eventTracking: EventTrackingService,
    ) {
        this.isMobile$ = this.breakpointObserver.observe('(max-width: 576px)').pipe(map(result => result.matches));
        this.socialNetworks = [
            {
                icon: 'brand-whatsapp',
                href: () => this.getTrustUrl(this.hrefWhatsapp()),
                label: 'Whatsapp',
                click: () => this.eventTrackingClicked('SHARE_TWITTER'),
            },
            {
                icon: 'brand-facebook-f',
                href: () => this.getTrustUrl(this.hrefFacebook()),
                label: 'Facebook',
                click: () => this.eventTrackingClicked('SHARE_FACEBOOK'),
            },
            {
                icon: 'brand-twitter',
                href: () => this.getTrustUrl(this.hrefTwitter()),
                label: 'Twitter',
                click: () => this.eventTrackingClicked('SHARE_WHATSAPP'),
            },
        ];

        this.socialNetworks.forEach(socialNetwork => {
            this.iconRegistry.addSvgIcon(
                socialNetwork.icon,
                this.sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${socialNetwork.icon}.svg`),
            );
        });

        this.isLoading = false;
        this.isLoadingPDF = false;
        this.isLoadFailed = false;

        this.chargeValue = 0;
    }

    ngOnInit(): void {
        this.getChargeContent();
    }

    onLogout() {
        this.authService.logout();
    }

    onShowModalChargeValue(): void {
        this.eventTrackingClicked('DEFINIR_VALOR_COBRANCA');
        this.dialog
            .open(ChargeValueModalComponent, {
                width: '280px',
                panelClass: 'o-modal-reset',
            })
            .afterClosed()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(result => {
                if (result && result.value !== undefined) {
                    if (this.chargeValue === result.value) {
                        return;
                    }
                    this.chargeValue = result.value;
                    this.getChargeContent();
                }
            });
    }

    eventTrackingClicked(button_name: string): void {
        this.eventTracking.eventTrackingUserCliked(button_name, 'cobrar', window, document);
    }

    onShowShareLinksModal(): void {
        this.dialog.open(ShareLinksComponent, {
            width: '100%',
            panelClass: 'o-modal-reset',
            data: {
                title: 'Compartilhe seu link',
                contentToCopy: this.chargeContent.data.paymentLink,
                links: this.socialNetworks,
            },
        });
    }

    onClearChargeValue(): void {
        this.chargeValue = 0;
        this.getChargeContent();
    }

    onCopyLinkCallback(copied: boolean): void {
        this.eventTrackingClicked('COPIAR_LINK');

        if (copied) {
            this.notificationService.openSnackbar('Link de cobrança copiado com sucesso!', SnackbarTypes.DONE);
        } else {
            this.notificationService.openSnackbar('Ocorreu um erro ao copiar o link de cobrança!', SnackbarTypes.ERROR);
        }
    }

    onHandleDownloadQrCode(): void {
        if (this.chargeContent && !this.isLoadFailed) {
            this.eventTrackingClicked('IMPRIMIR_QR_CODE');

            this.isLoadingPDF = true;
            const token_biz = localStorage.getItem('token_biz');

            this.chargeService
                .downloadQrCode(token_biz)
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe(
                    pdf => {
                        const blob = new Blob([pdf], { type: 'application/pdf' });
                        FileSaver.saveAs(blob, 'QR Code.pdf');

                        const fileURL = URL.createObjectURL(blob);
                        window?.open(fileURL, '_blank')?.print();
                    },
                    error => {
                        this.notificationService.openSnackbar(getErrorMessage(error), SnackbarTypes.ERROR);
                    },
                )
                .add(() => (this.isLoadingPDF = false));
        }

        EventTracking.track('User Clicked', {
            action: 'print_QR_code',
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'print_QR_code',
        });
    }

    getChargeContent(): void {
        this.isLoading = true;
        this.isLoadFailed = false;

        const token_biz = localStorage.getItem('token_biz');
        // example: value 5 represents 0,05
        const value = this.chargeValue;
        const fixed_value = this.chargeValue !== 0;
        this.chargeService
            .getChargeTransaction({ token_biz, value, fixed_value })
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                result => {
                    this.chargeContent = result;
                    this.isLoadFailed = false;
                },
                error => {
                    this.isLoadFailed = true;
                    this.chargeValue = 0;
                    this.chargeContent = {
                        data: {
                            key: '',
                            paymentLink: '',
                        },
                    };
                    this.notificationService.openSnackbar(getErrorMessage(error), SnackbarTypes.ERROR);
                },
            )
            .add(() => (this.isLoading = false));

        EventTracking.track('Payment Request Shared', {
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'send_request',
            event_label: 'Payment Request Shared',
        });
    }

    private hrefWhatsapp() {
        return `https://api.whatsapp.com/send?text=${this.deepMessage()}`;
    }

    private hrefTwitter() {
        return `https://twitter.com/intent/tweet?text=${this.deepMessage()}`;
    }

    private hrefFacebook() {
        return `https://www.facebook.com/sharer/sharer.php?u=${this.getEncodeUserUrl()}&quote=${this.deepMessage()}`;
    }

    private getTrustUrl(url: string): SafeUrl {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    private getEncodeUserUrl(): string {
        return encodeURIComponent(this.chargeContent.data.paymentLink);
    }

    private deepMessage(): string {
        return `Olá, segue meu link no Picpay para pagamento: ${this.getEncodeUserUrl()}. Por favor, pague com este link no app Picpay.`;
    }
}
