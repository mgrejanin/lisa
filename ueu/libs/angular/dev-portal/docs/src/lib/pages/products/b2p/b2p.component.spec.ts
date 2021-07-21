import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { DevPortalSharedModule } from '@picpay/dev-portal/shared';
import { SharedTrackEventsModule } from '@picpay/angular/shared/track-events';
import { UiStore } from '@picpay/dev-portal/shared';
import { MockModule } from 'ng-mocks';

import { B2pComponent } from './b2p.component';

describe('B2pComponent', () => {
    let component: B2pComponent;
    let fixture: ComponentFixture<B2pComponent>;
    let store: UiStore;

    const mockDialog = {
        open: jasmine.createSpy('open'),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [B2pComponent],
            imports: [
                RouterTestingModule.withRoutes([]),
                SharedTrackEventsModule.forRoot(),
                MockModule(DesignSystemAngularModule),
                MatDialogModule,
                HttpClientTestingModule,
                DevPortalSharedModule,
            ],
            providers: [{ provide: MatDialog, useValue: mockDialog }, UiStore],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(B2pComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(UiStore);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have an openDialog function', () => {
        expect(component.openDialog).toBeDefined();
        fixture.detectChanges();

        component.openDialog();
        expect(mockDialog.open).toHaveBeenCalled();
    });

    it('should have a prop isMobile as true', () => {
        let isMobile;
        store.updateIsMobile(true);
        component.isMobile$.subscribe(value => {
            isMobile = value;
        });
        expect(isMobile).toEqual(true);
    });

    it('should have a prop isMobile as false', () => {
        let isMobile;
        store.updateIsMobile(false);
        component.isMobile$.subscribe(value => {
            isMobile = value;
        });
        expect(isMobile).toEqual(false);
    });
});
