import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { MockModule } from 'ng-mocks';

import { ConfirmComponent } from '@picpay/seller-panel/shared';
import { MatDialogMock } from '@picpay/angular/shared/helpers';

import { TableFutureReleasesComponent } from './table-future-releases.component';

describe('TableFutureReleasesComponent', () => {
    let component: TableFutureReleasesComponent;
    let fixture: ComponentFixture<TableFutureReleasesComponent>;
    let matDialog: MatDialog;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TableFutureReleasesComponent],
            imports: [MockModule(MatTableModule), MockModule(MatIconModule), MockModule(MatChipsModule)],
            providers: [{ provide: MatDialog, useClass: MatDialogMock }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TableFutureReleasesComponent);
        component = fixture.componentInstance;

        matDialog = TestBed.inject(MatDialog);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have openFutureReleasesDetails function with tax props', () => {
        const matDialogOpenSpy = spyOn(matDialog, 'open');
        const futureReleaseMock = {
            label: 'Disponível em 05/01',
            balance: {
                label: 'Saldo do dia',
                value: 'R$ 132,45',
            },
            list: [
                {
                    name: 'Lançamentos de vendas',
                    value: 'R$ 132,45',
                },
                {
                    id: 2343216,
                    name: 'Taxas',
                    value: 'R$ 4,13',
                },
            ],
        };
        component.openFutureReleasesDetails(futureReleaseMock);

        expect(matDialogOpenSpy).toHaveBeenCalledWith(ConfirmComponent, {
            panelClass: 'o-modal-reset',
            width: '280px',
            data: {
                title: 'Valor da taxa',
                caption: `A taxa descontada do valor inicial das suas vendas foi de R$ 4,13.`,
                buttons: {
                    align: 'center',
                    closeBtn: false,
                    confirm: 'Ok, entendi',
                },
            },
        });
    });

    it('should have openFutureReleasesDetails function dont open modal when dont have tax props', () => {
        const matDialogOpenSpy = spyOn(matDialog, 'open');
        const futureReleaseMock = {
            label: 'Disponível em 05/01',
            balance: {
                label: 'Saldo do dia',
                value: 'R$ 132,45',
            },
            list: [
                {
                    name: 'Lançamentos de vendas',
                    value: 'R$ 132,45',
                },
            ],
        };
        component.openFutureReleasesDetails(futureReleaseMock);

        expect(matDialogOpenSpy).not.toHaveBeenCalled();
    });
});
