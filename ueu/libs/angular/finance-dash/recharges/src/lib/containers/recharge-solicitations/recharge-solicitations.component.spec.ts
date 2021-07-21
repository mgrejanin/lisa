// angular
import { ComponentFixture, TestBed } from '@angular/core/testing';

// components
import { HeaderComponent } from '../../components/header/header.component';
import { RechargeSolicitationsComponent } from './recharge-solicitations.component';
import { ChangeRechargeValueComponent } from '../../components/modals/change-recharge-value/change-recharge-value.component';

// data
import { RechargesQuery, RechargesService } from '../../data-access';

// design system
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

// Material
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

// mocks
import { MockComponents, MockModule } from 'ng-mocks';
import { RechargesQueryMock } from '../../data-access/recharges/mocks/recharges.query.mock';
import { RechargesServiceMock } from '../../data-access/recharges/mocks/recharges.service.mock';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';

// rxjs
import { of } from 'rxjs';

describe('RechargeSolicitationsComponent', () => {
    let component: RechargeSolicitationsComponent;
    let fixture: ComponentFixture<RechargeSolicitationsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RechargeSolicitationsComponent, MockComponents(HeaderComponent)],
            providers: [
                { provide: RechargesQuery, useClass: RechargesQueryMock },
                { provide: RechargesService, useClass: RechargesServiceMock },
                { provide: NotificationsService, useValue: new MockNotificationsService(null) },
            ],
            imports: [
                MockModule(DesignSystemAngularModule),
                MockModule(MatIconModule),
                MockModule(MatTableModule),
                MockModule(MatPaginatorModule),
                MockModule(MatDialogModule),
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RechargeSolicitationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have displayColumns variable', () => {
        expect(component.displayedColumns).toEqual([
            'id_counter',
            'consumer_id',
            'recharge_method_type_id',
            'request_date',
            'status_name',
            'value',
            'completion_date',
            'code',
            'actions',
        ]);
    });

    it('should call getRecharges on init', () => {
        const spy = spyOn(component, 'getRecharges');

        component.ngOnInit();

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should have a getRecharges function', () => {
        const service = TestBed.inject(RechargesService);
        const spy = spyOn(service, 'getRecharges');

        component.getRecharges();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should return a RechargeMethod value ', () => {
        expect(component.getRechargesMethod('1')).toEqual('Boleto');
    });

    it('should have a openChangeRechargeValue function', () => {
        const matDialog = TestBed.inject(MatDialog);
        const openDialogSpy = spyOn(matDialog, 'open').and.returnValue({
            afterClosed: () => of({}),
        });

        const notifications = TestBed.inject(NotificationsService);
        const notificationsSpy = spyOn(notifications, 'openSnackbar');

        const rechargeID = '';
        const rechargeIDCounter = 0;
        const rechargeValue = 0;

        const config = {
            panelClass: ['o-modal-reset', 'full-screen-modal'],
            width: '440px',
            data: {
                rechargeID,
                rechargeIDCounter,
                rechargeValue,
            },
        };

        component.openChangeRechargeValue(rechargeID, rechargeIDCounter, rechargeValue);

        expect(openDialogSpy).toHaveBeenCalledWith(ChangeRechargeValueComponent, config);

        expect(notificationsSpy).toHaveBeenCalledWith('Valor alterado com sucesso!');
    });
});
