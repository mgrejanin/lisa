import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { CurrencyPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';

import { ExtractRow, ExtractService, ExtractServiceMock, Receipt, SidenavService } from '@picpay/seller-panel/services';
import {
    BlockedBalanceComponent,
    BlockedTransferredBalanceComponent,
    ConfirmComponent,
    LoadingSpinnerComponent,
    SidenavDetailsComponent,
} from '@picpay/seller-panel/shared';
import { MatDialogMock } from '@picpay/angular/shared/helpers';

import { ExtractDetailsComponent } from '../extract-details/extract-details.component';
import { TableExtractComponent } from './table-extract.component';

import { MockComponent, MockModule } from 'ng-mocks';
import { throwError } from 'rxjs';

describe('TableExtractComponent', () => {
    let component: TableExtractComponent;
    let fixture: ComponentFixture<TableExtractComponent>;
    let extractService: ExtractService;
    let matDialog: MatDialog;
    let sidenavService: SidenavService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                TableExtractComponent,
                MatTooltip,
                MockComponent(LoadingSpinnerComponent),
                MockComponent(ExtractDetailsComponent),
                MockComponent(SidenavDetailsComponent),
            ],
            imports: [MockModule(MatTableModule), MockModule(MatIconModule), MockModule(MatChipsModule)],
            providers: [
                SidenavService,
                CurrencyPipe,
                { provide: MatDialog, useClass: MatDialogMock },
                { provide: ExtractService, useClass: ExtractServiceMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TableExtractComponent);
        component = fixture.componentInstance;

        matDialog = TestBed.inject(MatDialog);
        extractService = TestBed.inject(ExtractService);
        sidenavService = TestBed.inject(SidenavService);

        component.data = {
            extract: [],
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have onGetWalletBalance function (Success case)', () => {
        const extractServiceSpy = spyOn(extractService, 'getWalletBalance').and.callThrough();

        component.onGetWalletBalance();

        expect(extractServiceSpy).toHaveBeenCalledTimes(1);
        expect(component.isLoadingWallet).toBe(false);
        expect(component.walletError).toBe(false);
    });

    it('should have onGetWalletBalance function (Error case)', () => {
        const extractServiceSpy = spyOn(extractService, 'getWalletBalance').and.returnValue(throwError({}));

        component.onGetWalletBalance();

        expect(extractServiceSpy).toHaveBeenCalledTimes(1);
        expect(component.isLoadingWallet).toBe(false);
        expect(component.walletError).toBe(true);
    });

    it('should have openExtractDetails function and open ConfirmComponent modal with tax', () => {
        const matDialogOpenSpy = spyOn(matDialog, 'open');

        const extractRowMock: ExtractRow = {
            title: 'Lançamento Picpay',
            description: 'Recebimento das vendas',
            type_item: 'input',
            value: 9.7,
            type_transaction: 'sales_recipe',
            status: 'finished',
            day: '2020-12-15',
            fee: 0.3,
        };

        component.openExtractDetails(extractRowMock);

        expect(matDialogOpenSpy).toHaveBeenCalledWith(ConfirmComponent, {
            panelClass: 'o-modal-reset',
            width: '280px',
            data: {
                title: 'Valor da taxa',
                caption: `A taxa descontada do valor inicial das suas vendas foi de R$0.30.`,
                buttons: {
                    align: 'center',
                    closeBtn: false,
                    confirm: 'Ok, entendi',
                },
            },
        });
    });

    it('should have openExtractDetails function and open BlockedTransferredBalanceComponent modal', () => {
        const matDialogOpenSpy = spyOn(matDialog, 'open');

        const extractRowMock: ExtractRow = {
            title: 'Lançamento Picpay',
            description: 'Recebimento das vendas',
            type_item: 'input',
            value: 9.7,
            type_transaction: 'judicial_block_transferred',
            status: 'finished',
            day: '2020-12-15',
            fee: 0.3,
        };

        component.openExtractDetails(extractRowMock);

        expect(matDialogOpenSpy).toHaveBeenCalledWith(BlockedTransferredBalanceComponent, {
            width: '440px',
            panelClass: 'o-modal-reset',
        });
    });

    it('should have openExtractDetails function without fee and DONT open any modal', () => {
        const matDialogOpenSpy = spyOn(matDialog, 'open');

        const extractRowMock: ExtractRow = {
            title: 'Lançamento Picpay',
            description: 'Recebimento das vendas',
            type_item: 'input',
            value: 9.7,
            status: 'finished',
            day: '2020-12-15',
        };

        component.openExtractDetails(extractRowMock);

        expect(matDialogOpenSpy).not.toHaveBeenCalled();
    });

    it('should have onShowblockedBalanceModal function', () => {
        const matDialogOpenSpy = spyOn(matDialog, 'open');

        component.onShowblockedBalanceModal();

        expect(matDialogOpenSpy).toHaveBeenCalledWith(BlockedBalanceComponent, {
            width: '440px',
            panelClass: 'o-modal-reset',
        });
    });

    it('should have isTodayExtractDate function', () => {
        expect(component.isTodayExtractDate('2020-01-12')).toBe(false);
    });

    it('should have shortDescription function', () => {
        expect(
            component.shortDescription('some description to test shortDescription method from table-extract component'),
        ).toEqual('some description to test sh...');

        expect(component.shortDescription('some description to test')).toEqual('some description to test');
    });

    it('should have onReceivableDetails function', () => {
        const sidenavServiceSpy = spyOn(sidenavService, 'open');

        component.onReceivableDetails();

        expect(sidenavServiceSpy).toHaveBeenCalledTimes(1);
    });

    it('should have openExtractDetails function with (receipt)', () => {
        const onReceivableDetailsSpy = spyOn(component, 'onReceivableDetails');

        const receipt: Receipt = {
            banners: [
                {
                    label: '',
                    type: '',
                },
            ],
            header: {
                date: new Date(),
                id: '',
                img_url: '',
                title: '',
            },
            body: {
                destination: {
                    account: '',
                    agency: '',
                    cnpj: '',
                    institution: '',
                },
                beneficiary: {
                    cnpj: '',
                },
                description: {
                    label: '',
                    cnpj: '',
                    total_transfer: 2000,
                    flag_card: '',
                    form_of_payment: '',
                },
            },
            total: 2355,
            type: '',
            user_id: 123,
        };

        const extractRowMock: ExtractRow = {
            title: 'Lançamento Picpay',
            description: 'Recebimento das vendas',
            type_item: 'input',
            value: 9.7,
            type_transaction: 'judicial_block_transferred',
            status: 'finished',
            day: '2020-12-15',
            fee: 0.3,
            receipt: receipt,
        };

        component.openExtractDetails(extractRowMock);

        expect(component.currentReceipt).toMatchObject(receipt);
        expect(onReceivableDetailsSpy).toHaveBeenCalledTimes(1);
    });
});
