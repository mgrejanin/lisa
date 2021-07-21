import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

import {
    ChangeProfileService,
    SellerChildrenProfile,
    SellerQuery,
    SellerResponse,
    SellerService,
} from '@picpay/seller-panel/services';
import { WINDOW } from '@picpay/angular/shared/helpers';

import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'seller-panel-change-profile',
    templateUrl: './change-profile.component.html',
    styleUrls: ['./change-profile.component.scss'],
})
export class ChangeProfileComponent implements OnInit, OnDestroy {
    sellers: SellerChildrenProfile[];
    sellersFiltered: SellerChildrenProfile[];
    currentSeller: SellerResponse;
    loading: boolean;
    loadedError: boolean;

    private readonly unsubscribe$: Subject<void>;

    constructor(
        private sellerGroupService: ChangeProfileService,
        private sellerService: SellerService,
        private sellerQuery: SellerQuery,
        @Inject(WINDOW) private windowToken: Window,
    ) {
        this.unsubscribe$ = new Subject();
        this.currentSeller = this.sellerQuery.getValue();
        this.sellersFiltered = [];
        this.loading = true;
        this.loadedError = false;
    }

    ngOnInit(): void {
        this.getSellers();
    }

    getSellers(): void {
        const currentId = this.currentSeller.organization.id;

        /**
         * Try to get the original seller if exist.
         * Original seller is set when you change the profile for the first time
         */
        const originalSeller = JSON.parse(localStorage.getItem('original_login_seller'));

        this.loading = true;
        this.loadedError = false;

        this.sellerGroupService
            .getSellers()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (response: SellerChildrenProfile[]) => {
                    // Set sellers and remove from list the current profile
                    this.sellers = response;
                    this.sellers = this.sellers.filter(seller => seller.id !== currentId);

                    if (originalSeller !== null && originalSeller.organization.id !== currentId) {
                        // If exist original seller, we put him on top of the list
                        this.sellers.unshift(originalSeller.organization);
                    }

                    this.sellersFiltered = this.sellers;
                    this.loading = false;
                },
                () => {
                    this.sellersFiltered = [];
                    this.loading = false;
                    this.loadedError = true;
                },
            );
    }

    changeSeller(id: number): void {
        this.loading = true;

        this.sellerGroupService
            .changeSeller(id)
            .pipe(
                takeUntil(this.unsubscribe$),
                finalize(() => {
                    this.loading = false;
                }),
            )
            .subscribe(response => {
                const tokensKeys = [
                    'token_biz',
                    'token_transaction',
                    'token_transaction_expires_in',
                    'token_refresh',
                    'token_refresh_expires_in',
                    'timezone',
                ];
                tokensKeys.forEach(key => {
                    if (response[key]) {
                        if (key === 'timezone') {
                            localStorage.setItem(key, JSON.stringify(response[key]));
                        } else {
                            localStorage.setItem(key, response[key]);
                        }
                    }
                });

                localStorage.setItem('original_login_seller', JSON.stringify(response.original_login_seller));
                this.sellerService.setSellerData(response.seller);
                this.reloadPage();
            });
    }

    onSearchProfiles(value: string): void {
        this.sellersFiltered = this.sellers.filter(seller => new RegExp(value, 'i').test(seller.name));
        this.loading = false;
    }

    reloadPage(): void {
        this.windowToken.location.reload();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
