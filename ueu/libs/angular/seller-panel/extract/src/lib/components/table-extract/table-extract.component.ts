import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import {
    ExtractItem,
    ExtractRow,
    ExtractService,
    Receipt,
    StatusExtract,
    StatusExtractItem,
    StatusIcons,
    SidenavService,
    Wallet,
} from '@picpay/seller-panel/services';
import {
    BlockedBalanceComponent,
    BlockedTransferredBalanceComponent,
    ConfirmComponent,
} from '@picpay/seller-panel/shared';
import { isToday, subscribeUntil } from '@picpay/angular/shared/helpers';

@Component({
    selector: 'seller-panel-table-extract',
    templateUrl: './table-extract.component.html',
    styleUrls: ['./table-extract.component.scss'],
})
export class TableExtractComponent implements OnInit {
    @Input() data!: { extract: ExtractItem[] };
    currentReceipt: Receipt;

    displayedColumns: string[] = ['icon', 'title', 'description', 'status', 'value'];
    currentBalance: number;
    blockedBalance: number;
    status = StatusExtract;
    icons = StatusIcons;
    isLoadingWallet: boolean;
    walletError: boolean;

    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitzer: DomSanitizer,
        private sidenavService: SidenavService,
        private currencyPipe: CurrencyPipe,
        private matDialog: MatDialog,
        private extractService: ExtractService,
    ) {
        this.matIconRegistry.addSvgIcon(
            'in_transaction',
            this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/in_transaction.svg'),
        );
        this.matIconRegistry.addSvgIcon(
            'out_transaction',
            this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/out_transaction.svg'),
        );
        this.matIconRegistry.addSvgIcon(
            'automatic_transaction',
            this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/automatic_transaction.svg'),
        );
    }

    ngOnInit(): void {
        this.onGetWalletBalance();
    }

    onGetWalletBalance(): void {
        this.isLoadingWallet = true;
        this.walletError = false;

        this.extractService
            .getWalletBalance()
            .pipe(subscribeUntil(this))
            .subscribe(
                (response: Wallet) => {
                    this.currentBalance = response.available_balance;
                    this.blockedBalance = response.blocked_balance;

                    this.isLoadingWallet = false;
                    this.walletError = false;
                },
                () => {
                    this.isLoadingWallet = false;
                    this.walletError = true;
                },
            );
    }

    onExtractDetails(row: ExtractRow): MatDialogRef<BlockedTransferredBalanceComponent> {
        if (row.type_transaction === StatusExtractItem.judicial_block_transferred) {
            return this.matDialog.open(BlockedTransferredBalanceComponent, {
                width: '440px',
                panelClass: 'o-modal-reset',
            });
        }

        if (!row.fee) {
            return;
        }

        const taxValue = this.currencyPipe.transform(row.fee, 'BRL');
        const config = {
            panelClass: 'o-modal-reset',
            width: '280px',
            data: {
                title: 'Valor da taxa',
                caption: `A taxa descontada do valor inicial das suas vendas foi de ${taxValue}.`,
                buttons: {
                    align: 'center',
                    closeBtn: false,
                    confirm: 'Ok, entendi',
                },
            },
        };

        this.matDialog.open(ConfirmComponent, config);
    }

    onReceivableDetails() {
        this.sidenavService.open();
    }

    openExtractDetails(row: ExtractRow) {
        if (row.receipt) {
            this.currentReceipt = row.receipt;
            this.onReceivableDetails();
            return;
        }
        this.onExtractDetails(row);
    }

    shortDescription(description: string, length?: number): string {
        return description.length > (length || 27) ? `${description.substring(0, length || 27)}...` : description;
    }

    onShowblockedBalanceModal(): void {
        this.matDialog.open(BlockedBalanceComponent, { width: '440px', panelClass: 'o-modal-reset' });
    }

    isTodayExtractDate(date: string): boolean {
        return isToday(date);
    }
}
