import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { subscribeUntil } from '@picpay/angular/shared/helpers';
import { Observable } from 'rxjs';
import { SellerQuery, SellerService, StepService } from '../../data-access';
import { Navigate } from '../../models/navigation.model';
import { StepperService } from '../../services/stepper/stepper.service';

@Component({
    selector: 'seller-register-good-you-back',
    templateUrl: './good-you-back.component.html',
    styleUrls: ['./good-you-back.component.scss'],
})
export class GoodYouBackComponent implements OnInit {
    readonly nameSeller$: Observable<string>;
    private readonly step$: Observable<number | null | undefined>;

    constructor(
        private sellerQuery: SellerQuery,
        private stepService: StepService,
        private stepperService: StepperService,
        private sellerService: SellerService,
        private router: Router,
    ) {
        this.nameSeller$ = this.sellerQuery.nameSeller$;
        this.step$ = this.sellerQuery.step$;
    }

    ngOnInit(): void {
        this.stepService.initStep({
            activateProgressbar: false,
        });
    }

    resetSellerRegister(): void {
        this.sellerService.resetSeller();
        this.router.navigate(['/']);
    }

    continueRegistration(): void {
        this.step$.pipe(subscribeUntil(this)).subscribe((lastStep: number) => {
            const lastStepUser: Navigate = this.stepperService.getLastStepUser(lastStep);

            this.router.navigate([`/form/${lastStepUser?.path}`]);
        });
    }
}
