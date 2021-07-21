import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterTestingModule } from '@angular/router/testing';

import { UserDropdownComponent } from '@picpay/ui/components';

import { HeaderComponent } from './header.component';
import { MockComponents, MockModule } from 'ng-mocks';

import { ChangePanelService, EventTrackingService } from '@picpay/seller-panel/services';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { MatDialogMock } from '@picpay/angular/shared/helpers';

import { ChangeProfileComponent } from '../change-profile/change-profile.component';
import { ModalDynamicComponent } from '../modals/dynamic/dynamic.component';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let eventTracking: EventTrackingService;
    let matDialog: MatDialog;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                MockModule(MatIconModule),
                MockModule(MatMenuModule),
                MockModule(MatProgressSpinnerModule),
            ],
            declarations: [HeaderComponent, MockComponents(UserDropdownComponent, ChangeProfileComponent)],
            providers: [
                ChangePanelService,
                { provide: NotificationsService, useValue: new MockNotificationsService({ confirmed: true }) },
                { provide: MatDialog, useClass: MatDialogMock },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;

        component.showLogoInDesktop = true;

        matDialog = TestBed.inject(MatDialog);
        eventTracking = TestBed.inject(EventTrackingService);

        fixture.detectChanges();
    });

    it('should create', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
        expect(component.showLogoInDesktop).toBe(true);
    });

    it('should have onLogout function', () => {
        const logoutSpy = spyOn(component.logout, 'emit');
        const evntTrackingSpy = spyOn(component, 'eventTrackingClicked');

        component.onLogout();

        expect(logoutSpy).toHaveBeenCalled();
        expect(evntTrackingSpy).toHaveBeenCalled();
    });

    it('should call eventTracking function', () => {
        const eventTrackingSpy = spyOn(eventTracking, 'eventTrackingUserCliked');

        component.eventTrackingClicked('SAIR');

        expect(eventTrackingSpy).toHaveBeenCalled();
    });

    it('should have onChangeProfile function', () => {
        const matDialogSpy = spyOn(matDialog, 'open').and.callThrough();

        component.showLogoInDesktop = false;

        component.onChangeProfile();

        expect(matDialogSpy).toHaveBeenCalledWith(ModalDynamicComponent, {
            width: '560px',
            panelClass: ['o-modal'],
            data: {
                title: 'Trocar perfil',
                component: ChangeProfileComponent,
                actions: { visible: false },
            },
        });
    });
});

describe('HeaderComponent with showLogoInDesktop', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                MockModule(MatIconModule),
                MockModule(MatMenuModule),
                MockModule(MatProgressSpinnerModule),
            ],
            declarations: [HeaderComponent, MockComponents(UserDropdownComponent, ChangeProfileComponent)],
            providers: [
                ChangePanelService,
                { provide: NotificationsService, useValue: new MockNotificationsService({ confirmed: true }) },
                { provide: MatDialog, useClass: MatDialogMock },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;

        component.showLogoInDesktop = false;

        fixture.detectChanges();
    });

    it('should create s', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
        expect(component.showLogoInDesktop).toBe(false);
    });
});
