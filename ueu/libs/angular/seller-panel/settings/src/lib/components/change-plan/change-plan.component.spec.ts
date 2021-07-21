import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

import { MockComponents } from 'ng-mocks';

import {
    EcommerceService,
    EcommerceServiceMock,
    SellerService,
    SellerServiceMock,
} from '@picpay/seller-panel/services';
import { LoadingButtonComponent } from '@picpay/seller-panel/shared';
import { MatDialogRefMock } from '@picpay/angular/shared/helpers';

import { ChangePlanComponent } from './change-plan.component';

describe('ChangePlanComponent', () => {
    let component: ChangePlanComponent;
    let fixture: ComponentFixture<ChangePlanComponent>;
    let matDialogRef: MatDialogRef<ChangePlanComponent>;
    let sellerService: SellerService;
    let ecommerceService: EcommerceService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChangePlanComponent, MockComponents(LoadingButtonComponent, MatIcon)],
            providers: [
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        id: '5b3f91315efe320b080fb4a2',
                        name: '1 dia',
                        fee: 5.89,
                    },
                },
                {
                    provide: SellerService,
                    useClass: SellerServiceMock,
                },
                {
                    provide: MatDialogRef,
                    useClass: MatDialogRefMock,
                },
                {
                    provide: EcommerceService,
                    useClass: EcommerceServiceMock,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangePlanComponent);
        component = fixture.componentInstance;

        matDialogRef = TestBed.inject(MatDialogRef);
        sellerService = TestBed.inject(SellerService);
        ecommerceService = TestBed.inject(EcommerceService);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have onClose function', () => {
        const closeSpy = spyOn(matDialogRef, 'close');
        component.onClose();

        expect(closeSpy).toHaveBeenCalled();
    });

    it('should have onConfirm function', () => {
        const closeSpy = spyOn(matDialogRef, 'close');
        const setPlanSpy = spyOn(component, 'onSetPlan');

        component.onConfirm();

        expect(setPlanSpy).toHaveBeenCalled();

        component.isReadyToChange = false;

        component.onConfirm();

        expect(closeSpy).toHaveBeenCalled();
    });

    it('should have onSetPlan function', () => {
        const refreshDataSpy = spyOn(sellerService, 'refreshSellerData');

        component.onSetPlan();

        ecommerceService.setPlan('5b3f91315efe320b080fb4a2').subscribe(
            () => {
                expect(refreshDataSpy).toHaveBeenCalled();
            },
            () => {
                expect(component.changePlanError).toBe(true);
                expect(component.isChangingPlan).toBe(false);
                expect(component.isReadyToChange).toBe(false);
            },
            () => {
                expect(component.changePlanError).toBe(false);
                expect(component.isChangingPlan).toBe(false);
                expect(component.isReadyToChange).toBe(false);
                expect(component.changePlanButtonLabel).toBe('Ok, entendi');
            },
        );
    });
});
