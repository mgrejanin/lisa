import { MockComponents, MockModule } from 'ng-mocks';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogMock } from '@picpay/angular/shared/helpers';
import { EventTrackingService, SidenavService } from '@picpay/seller-panel/services';
import { SidenavDetailsComponent } from '@picpay/seller-panel/shared';

import { detailTransactionMock } from '../../mocks/details-transaction.mock';
import { listTransactionsMock, TableColumnsMock } from '../../mocks/table-transactions.mock';
import { DetailsTransactionsComponent } from '../details-transactions/details-transactions.component';
import { TableTransactionsComponent } from './table-transactions.component';

describe('TableTransactionsComponent', () => {
    let component: TableTransactionsComponent;
    let fixture: ComponentFixture<TableTransactionsComponent>;
    let eventTracking: EventTrackingService;
    let sidenavService: SidenavService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatTableModule, MockModule(MatIconModule)],
            declarations: [
                TableTransactionsComponent,
                MockComponents(SidenavDetailsComponent, DetailsTransactionsComponent),
            ],
            providers: [SidenavService, EventTrackingService, { provide: MatDialog, useClass: MatDialogMock }],
        }).compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(TableTransactionsComponent);
        eventTracking = TestBed.inject(EventTrackingService);
        component = fixture.componentInstance;

        sidenavService = TestBed.inject(SidenavService);

        component.displayedColumns = TableColumnsMock;
        component.listTransactions = listTransactionsMock;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call onOpenSidenav method', () => {
        const openSpy = spyOn(sidenavService, 'open');
        const evttrackingSpy = spyOn(eventTracking, 'eventTrackingUserCliked');

        component.onOpenSidenav(detailTransactionMock);

        expect(evttrackingSpy).toHaveBeenCalledTimes(1);
        expect(component.detailTransaction).toMatchObject(detailTransactionMock);
        expect(openSpy).toHaveBeenCalledTimes(1);
    });

    it('should call onCloseSidenav method', () => {
        const closeSpy = spyOn(sidenavService, 'close');
        const closedSpy = spyOn(sidenavService, 'closed');
        const evttrackingSpy = spyOn(eventTracking, 'eventTrackingUserCliked');

        component.onCloseSidenav();

        expect(evttrackingSpy).toHaveBeenCalledTimes(1);
        expect(closeSpy).toHaveBeenCalledTimes(1);
        expect(closedSpy).toHaveBeenCalledTimes(1);
    });
});
