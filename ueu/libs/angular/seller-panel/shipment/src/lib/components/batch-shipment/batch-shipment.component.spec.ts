import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { BatchShipmentComponent } from './batch-shipment.component';
import { MockComponents, MockModule } from 'ng-mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { batchMock, ShipmentService, ShipmentServiceMock } from '@picpay/seller-panel/services';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { By } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { WINDOW } from '@picpay/angular/shared/helpers';

describe('BatchShipmentComponent', () => {
    let component: BatchShipmentComponent;
    let fixture: ComponentFixture<BatchShipmentComponent>;
    let windowToken: Window;

    const mockDialog = {
        open: jasmine.createSpy('open'),
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                RouterTestingModule,
                MockModule(DesignSystemAngularModule),
                MockModule(MatDatepickerModule),
                MockModule(MatRadioModule),
            ],
            declarations: [BatchShipmentComponent, MockComponents(MatLabel, MatFormField)],
            providers: [
                { provide: ShipmentService, useClass: ShipmentServiceMock },
                { provide: MatDialog, useValue: mockDialog },
                { provide: Window, useValue: WINDOW },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com', release: 'qa' }),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BatchShipmentComponent);
        component = fixture.componentInstance;
        windowToken = TestBed.inject(WINDOW);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call the onFileChange() function', () => {
        const input = fixture.debugElement.query(By.css('#file'));
        const onFileChangeSpy = spyOn(component, 'onFileChange');
        input.triggerEventHandler('change', batchMock.file);
        expect(onFileChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('should have change steps', () => {
        const expectedStep = 2;
        const scrollSpy = spyOn(windowToken, 'scroll');
        component.setStep(expectedStep);
        component.step$.subscribe((step: number) => {
            expect(expectedStep).toEqual(step);
        });
        expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: 'auto' });
    });

    it('should have form invalid when empty', () => {
        expect(component.form.valid).toBeFalsy();
    });

    it('should have call openConfirmPayment function', () => {
        const spy = spyOn(component, 'openConfirmPayment');
        component.openConfirmPayment();
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
