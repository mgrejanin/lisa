import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { DevPortalSharedModule, UiQuery } from '@picpay/dev-portal/shared';
import { SharedTrackEventsModule } from '@picpay/angular/shared/track-events';
import { UiStore } from '@picpay/dev-portal/shared';

import { MockModule } from 'ng-mocks';

import { AssinaturasComponent } from './assinaturas.component';

describe('AssinaturasComponent', () => {
    let component: AssinaturasComponent;
    let fixture: ComponentFixture<AssinaturasComponent>;
    let store: UiStore;
    let query: UiQuery;

    const mockDialog = {
        open: jasmine.createSpy('open'),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AssinaturasComponent],
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
        fixture = TestBed.createComponent(AssinaturasComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(UiStore);
        query = TestBed.inject(UiQuery);
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
        let isMobile: boolean;
        store.updateIsMobile(true);
        query.isMobile$.subscribe(value => {
            isMobile = value;
        });
        expect(isMobile).toBe(true);
    });

    it('should have a prop isMobile as false', () => {
        let isMobile: boolean;
        store.updateIsMobile(false);
        query.isMobile$.subscribe(value => {
            isMobile = value;
        });
        expect(isMobile).toBe(false);
    });
});
