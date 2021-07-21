import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { DevPortalSharedModule } from '@picpay/dev-portal/shared';
import { SharedTrackEventsModule } from '@picpay/angular/shared/track-events';
import { UiStore } from '@picpay/dev-portal/shared';
import { Renderer2 } from '@angular/core';
import { ECommerceComponent } from './e-commerce.component';

describe('ECommerceComponent', () => {
    let component: ECommerceComponent;
    let fixture: ComponentFixture<ECommerceComponent>;
    let store: UiStore;
    let renderer2: Renderer2;

    const mockDialog = {
        open: jasmine.createSpy('open'),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ECommerceComponent],
            imports: [
                RouterTestingModule.withRoutes([]),
                SharedTrackEventsModule.forRoot(),
                DesignSystemAngularModule,
                MatDialogModule,
                HttpClientTestingModule,
                DevPortalSharedModule,
            ],
            providers: [{ provide: MatDialog, useValue: mockDialog }, UiStore, Renderer2],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ECommerceComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(UiStore);
        renderer2 = TestBed.inject(Renderer2);
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

    xit('should have an onLoadScript function', () => {
        const renderer2AppendChildSpy = spyOn(renderer2, 'appendChild');
        component.onLoadScript();
        expect(renderer2AppendChildSpy).toHaveBeenCalled();
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
