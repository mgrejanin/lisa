import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Ecommerce, EcommerceService, PlanResponse, SellerQuery } from '@picpay/seller-panel/services';
import { validateAllFormFields } from '@picpay/angular/shared/helpers';

import { ChangePlanComponent } from '../change-plan/change-plan.component';

@Component({
    selector: 'seller-panel-my-plan',
    templateUrl: './my-plan.component.html',
    styleUrls: ['./my-plan.component.scss'],
})
export class MyPlanComponent implements OnInit, OnDestroy {
    formPlan: FormGroup;

    currentEcommerce: Ecommerce;
    allPlans: PlanResponse[];
    currentPlan: PlanResponse;
    gracePeriodPlan: number;
    loadingPlans: boolean;
    hasErrorPlans: boolean;

    private readonly unsubscribe$: Subject<void>;

    constructor(
        private formBuilder: FormBuilder,
        private sellerQuery: SellerQuery,
        private ecommerceService: EcommerceService,
        private matDialog: MatDialog,
    ) {
        this.currentEcommerce = this.sellerQuery.getValue().ecommerce;
        this.loadingPlans = false;
        this.hasErrorPlans = false;

        this.unsubscribe$ = new Subject();
    }

    ngOnInit(): void {
        this.formPlan = this.formBuilder.group({
            plan_id: ['', [Validators.required]],
        });

        this.getAllPlans();
    }

    setCurrentPlanById(id: string) {
        if (this.allPlans.length) {
            this.currentPlan = this.allPlans.find(plan => plan.id === id);
            this.formPlan.patchValue({ id: this.currentPlan?.id });
        }
    }

    getAllPlans(): void {
        this.loadingPlans = true;

        this.ecommerceService
            .getPlans()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                result => {
                    this.allPlans = result;

                    this.setCurrentPlanById(this.currentEcommerce?.planId);

                    this.loadingPlans = false;
                    this.hasErrorPlans = false;
                },
                () => {
                    this.loadingPlans = false;
                    this.hasErrorPlans = true;
                },
            );
    }

    onChangePlan(plan: PlanResponse): void {
        this.currentPlan = plan;

        this.formPlan.get('plan_id').patchValue(this.currentPlan.id);
    }

    onSubmitPlan(): void {
        if (this.formPlan.valid) {
            this.openChangeConfirm();
        } else {
            validateAllFormFields(this.formPlan);
        }
    }

    openChangeConfirm() {
        this.matDialog.open(ChangePlanComponent, {
            width: '560px',
            panelClass: ['o-modal-reset', 'full-screen-modal'],
            data: {
                id: this.currentPlan.id,
                name: this.currentPlan.name,
                fee: this.currentPlan.fee,
            },
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
