import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { subscribeUntil } from '@picpay/angular/shared/helpers';
import { ApolloDialog } from '@picpay/design-system-angular-components';
import { Observable } from 'rxjs';
import { SellerQuery, StepService } from '../../data-access';
import { NavigationRoutes } from '../../models/navigation.model';
import { FeesService } from '../../services/fees/fees.service';

@Component({
    selector: 'seller-register-fees',
    templateUrl: './fees.component.html',
    styleUrls: ['./fees.component.scss'],
})
export class FeesComponent implements OnInit {
    readonly title: string;
    private selectedTax: number;
    readonly isLoading$: Observable<boolean>;

    @ViewChild('checkOutDialog') checkOutDialog: ApolloDialog;

    constructor(
        private stepService: StepService,
        private sellerQuery: SellerQuery,
        private feesService: FeesService,
        private router: Router,
    ) {
        this.title = 'Taxas e prazo';
        this.isLoading$ = this.sellerQuery.isLoading$;
        this.selectedTax = 1;
    }

    ngOnInit(): void {
        this.stepService.initStep({
            headerTitle: this.title,
            valueProgressBar: 6,
        });
    }

    onSubmit(): void {
        this.feesService
            .postFees({ company_fees: this.selectedTax })
            .pipe(subscribeUntil(this))
            .subscribe(resp => {
                if (resp?.success) {
                    this.nextStep();
                }
            });
    }

    openCheckOutDialog(): void {
        this.checkOutDialog.open();
    }

    selectTax(tax: number): void {
        this.selectedTax = tax;
    }

    private nextStep(): void {
        this.router.navigate([`/form/${NavigationRoutes.Fees}`]);
    }
}
