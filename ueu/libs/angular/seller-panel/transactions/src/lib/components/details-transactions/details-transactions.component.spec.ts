import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';

import { EventTracking } from '@picpay/event-tracking';
import { TransactionTable } from '@picpay/seller-panel/services';
import { MatDialogMock } from '@picpay/angular/shared/helpers';

import { CancelTransactionComponent } from '../cancel-transaction/cancel-transaction.component';
import { detailTransactionMock } from '../../mocks/details-transaction.mock';
import { DetailsTransactionsComponent } from './details-transactions.component';

import { MockModule } from 'ng-mocks';

describe('DetailsTransactionsComponent', () => {
    let component: DetailsTransactionsComponent;
    let fixture: ComponentFixture<DetailsTransactionsComponent>;
    let matDialog: MatDialog;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MockModule(MatFormFieldModule),
                MockModule(MatInputModule),
                MockModule(MatDialogModule),
                MockModule(MatIconModule),
                MockModule(MatSidenavModule),
                MockModule(MatProgressSpinnerModule),
            ],
            declarations: [DetailsTransactionsComponent, CancelTransactionComponent],
            providers: [{ provide: MatDialog, useClass: MatDialogMock }],
        }).compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(DetailsTransactionsComponent);
        matDialog = TestBed.inject(MatDialog);
        component = fixture.componentInstance;

        const currentDetails: TransactionTable = detailTransactionMock;

        component.currentTransaction = currentDetails;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have call onEventTracking functon', () => {
        const onEventTrackingSpy = spyOn(component, 'onEventTracking');

        component.ngOnInit();

        expect(onEventTrackingSpy).toHaveBeenCalledTimes(1);
    });

    it('should have call EventTracking', () => {
        const evtTracking = spyOn(EventTracking, 'track');

        component.onEventTracking();

        expect(evtTracking).toHaveBeenCalledWith('User Clicked', {
            to: 'Transaction Detail',
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Transaction Detail',
        });
    });

    it('should have call onCancelTransaction function', () => {
        const openSpy = spyOn(matDialog, 'open');

        component.onCancelTransaction();

        expect(openSpy).toHaveBeenLastCalledWith(CancelTransactionComponent, {
            width: '350px',
            panelClass: 'o-modal-reset',
            data: component.currentTransaction,
        });
    });
});
