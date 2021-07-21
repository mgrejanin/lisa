import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';

import { MockComponents, MockModule } from 'ng-mocks';

import { EcommerceService, EcommerceServiceMock } from '@picpay/seller-panel/services';
import { LoadingButtonComponent, ValidationMessagesComponent } from '@picpay/seller-panel/shared';
import { MatDialogMock } from '@picpay/angular/shared/helpers';

import { MyPlanComponent } from './my-plan.component';

import { ChangePlanComponent } from '../change-plan/change-plan.component';

describe('MyPlanComponent', () => {
    let component: MyPlanComponent;
    let fixture: ComponentFixture<MyPlanComponent>;
    let ecommerceService: EcommerceService;
    let matDialog: MatDialog;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, MatRadioModule, MockModule(MatFormFieldModule)],
            declarations: [
                MyPlanComponent,
                MockComponents(MatSpinner, ValidationMessagesComponent, LoadingButtonComponent),
            ],
            providers: [
                {
                    provide: MatDialog,
                    useClass: MatDialogMock,
                },
                {
                    provide: EcommerceService,
                    useClass: EcommerceServiceMock,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MyPlanComponent);
        component = fixture.componentInstance;

        matDialog = TestBed.inject(MatDialog);
        ecommerceService = TestBed.inject(EcommerceService);

        component.currentEcommerce = {
            daysForPayment: 7,
            forcePrivateFeed: false,
            planId: '5b3f91315efe320b080fb4a3',
            storeUrl: 'https://picpay.com',
        };

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have formPlan function', async () => {
        const form = component.formPlan;

        expect(form).toBeDefined();

        expect(form.get('plan_id')).toBeDefined();
        expect(form.get('plan_id').value).toBe('');
    });

    it('should have setCurrentPlanById function', () => {
        component.setCurrentPlanById('5b3f91315efe320b080fb4a2');

        expect(component.currentPlan).toEqual({
            id: '5b3f91315efe320b080fb4a2',
            name: '1 dia',
            description: 'Receba seus pagamentos em um dia, com apenas uma taxa de 5,89%.',
            days_to_withdrawal: 1,
            fee: 5.89,
            has_grace_period: true,
            grace_period: 90,
        });

        component.setCurrentPlanById('5b3f91315efe320b080fb4a3');

        expect(component.currentPlan).toEqual({
            id: '5b3f91315efe320b080fb4a3',
            name: '14 dias',
            description: 'Receba seus pagamentos em 14 dias, com apenas uma taxa de 4,89%.',
            days_to_withdrawal: 14,
            fee: 4.89,
            has_grace_period: true,
            grace_period: 90,
        });
    });

    it('should have onChangePlan function', async () => {
        const form = component.formPlan;

        expect(form).toBeDefined();

        component.onChangePlan({
            id: '5b3f91315efe320b080fb4a3',
            name: '14 dias',
            description: 'Receba seus pagamentos em 14 dias, com apenas uma taxa de 4,89%.',
            days_to_withdrawal: 14,
            fee: 4.89,
            has_grace_period: true,
            grace_period: 90,
        });

        expect(form.get('plan_id')).toBeDefined();
        expect(form.get('plan_id').value).toBe('5b3f91315efe320b080fb4a3');
    });

    it('should have getAllPlans function', () => {
        component.getAllPlans();

        ecommerceService.getPlans().subscribe(
            result => {
                expect(result).toEqual(component.allPlans);

                expect(component.loadingPlans).toBe(false);
                expect(component.hasErrorPlans).toBe(false);
            },
            () => {
                expect(component.loadingPlans).toBe(false);
                expect(component.hasErrorPlans).toBe(true);
            },
        );
    });

    it('should have openChangeConfirm function', () => {
        const matDialogSpy = spyOn(matDialog, 'open');

        component.openChangeConfirm();

        expect(matDialogSpy).toHaveBeenCalledWith(ChangePlanComponent, {
            width: '560px',
            panelClass: ['o-modal-reset', 'full-screen-modal'],
            data: {
                id: component.currentPlan.id || 1001,
                name: component.currentPlan.name || 'name-test',
                fee: component.currentPlan.fee || 28,
            },
        });
    });

    it('should have onSubmitPlan function', () => {
        const openChangeConfirmSpy = spyOn(component, 'openChangeConfirm');

        component.onSubmitPlan();

        expect(component.formPlan.valid).toBe(false);

        expect(openChangeConfirmSpy).not.toHaveBeenCalled();

        component.formPlan.get('plan_id').patchValue('5b3f91315efe320b080fb4a3');
        component.currentPlan = {
            id: '5b3f91315efe320b080fb4a3',
            name: '14 dias',
            description: 'Receba seus pagamentos em 14 dias, com apenas uma taxa de 4,89%.',
            days_to_withdrawal: 14,
            fee: 4.89,
            has_grace_period: true,
            grace_period: 90,
        };

        component.onSubmitPlan();

        expect(component.formPlan.valid).toBe(true);

        expect(openChangeConfirmSpy).toHaveBeenCalled();
    });
});
