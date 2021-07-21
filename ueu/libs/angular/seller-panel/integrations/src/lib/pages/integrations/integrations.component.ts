/* eslint-disable no-prototype-builtins */
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Subject, throwError } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { EcommerceService, Tokens } from '@picpay/seller-panel/services';

import { EventTracking } from '@picpay/event-tracking';
import { GenerateNewTokenComponent } from '../../components/generate-new-token/generate-new-token.component';
import { SellerPanelAuthService } from '@picpay/seller-panel/auth';

@Component({
    selector: 'seller-panel-integrations',
    templateUrl: './integrations.component.html',
    styleUrls: ['./integrations.component.scss'],
    animations: [
        // the fade-in/fade-out animation.
        trigger('simpleFadeAnimation', [
            state('in', style({ opacity: 1 })),

            transition(':enter', [style({ opacity: 0 }), animate(400)]),

            transition(':leave', animate(200, style({ opacity: 0 }))),
        ]),
    ],
})
export class IntegrationsComponent implements OnInit, OnDestroy {
    haveTokens: boolean;
    loading: boolean;
    inputTokens = {
        public: {
            picpayToken: null,
            sellerToken: null,
            x_picpay_token: null,
            x_seller_token: null,
        },
        vtex: {
            picpayToken: null,
            sellerToken: null,
            x_picpay_token: null,
            x_seller_token: null,
        },
    };
    private readonly unsubscribe$: Subject<void>;

    constructor(
        public dialog: MatDialog,
        private ecommerceService: EcommerceService,
        private authService: SellerPanelAuthService,
    ) {
        this.haveTokens = false;
        this.loading = true;
        this.unsubscribe$ = new Subject();
    }

    ngOnInit(): void {
        this.onGetTokens();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    onLogout(): void {
        this.authService.logout();
    }

    onGetTokens(): void {
        this.ecommerceService
            .getTokens()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (result: Tokens) => {
                    this.loading = false;

                    if (result.hasOwnProperty('x_picpay_token')) {
                        this.onSetInputTokens(result);
                    }
                },
                () => {
                    this.loading = false;
                },
            );
    }

    onTabChanged(event): void {
        EventTracking.track('Tab Selected', {
            selected_field: event.tab,
            action: 'Sou Cliente VTEX / Use a API Pública',
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Tab Selected',
        });
    }

    onSetInputTokens(data: Tokens): void {
        const { x_picpay_token, x_seller_token, application_key, application_token } = data;

        this.inputTokens.public = {
            x_picpay_token,
            x_seller_token,
            picpayToken: 'x_picpay_token',
            sellerToken: 'x_seller_token',
        };

        this.inputTokens.vtex = {
            x_picpay_token: application_token,
            x_seller_token: application_key,
            picpayToken: 'AppToken',
            sellerToken: 'AppKey',
        };

        this.haveTokens = true;
    }

    onGenerateTokens(): void {
        if (this.haveTokens) {
            this.dialog
                .open(GenerateNewTokenComponent, {
                    panelClass: ['o-modal-reset', 'full-screen-modal'],
                    width: '560px',
                })
                .afterClosed()
                .subscribe(result => {
                    if (result) {
                        this.onRequestTokens();
                    }
                });
        } else {
            this.onRequestTokens();
        }
    }

    onRequestTokens(): void {
        this.loading = true;
        this.haveTokens = false;

        this.ecommerceService
            .generateTokens()
            .pipe(
                takeUntil(this.unsubscribe$),
                catchError(error => {
                    this.loading = false;

                    return throwError(error);
                }),
            )
            .subscribe((result: Tokens) => {
                this.onSetInputTokens(result);
                this.loading = false;
            });

        EventTracking.track('Dialog Interacted', {
            selected_field: 'Gerar novos tokens ',
            action: 'novo_token',
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Dialog Interacted',
        });
    }
}
