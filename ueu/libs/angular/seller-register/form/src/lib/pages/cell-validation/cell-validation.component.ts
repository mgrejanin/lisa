import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { customMessage } from '@picpay/angular/shared/validators';
import { Observable, Subscriber, timer } from 'rxjs';
import { finalize, map, take, takeWhile } from 'rxjs/operators';
import { CellValidationService } from '../../services/cell-validation/cell-validation.service';
import { SellerQuery } from '../../data-access/seller/seller.query';
import { StepService } from '../../data-access/step/step.service';
import { subscribeUntil } from '@picpay/angular/shared/helpers';
import { UserPhone } from '../../models/user-phone.model';
import { Router } from '@angular/router';
import { NavigationRoutes } from '../../models/navigation.model';

@Component({
    selector: 'seller-register-cell-validation',
    templateUrl: './cell-validation.component.html',
    styleUrls: ['./cell-validation.component.scss'],
})
export class CellValidationComponent implements OnInit {
    readonly title: string;
    resendCode: boolean;
    cellForm: FormGroup;

    readonly nameSeller$: Observable<string>;
    readonly cellSeller$: Observable<string>;
    readonly isLoading$: Observable<boolean>;
    displayTimer$: Observable<string>;

    constructor(
        private formBuilder: FormBuilder,
        private stepService: StepService,
        private sellerQuery: SellerQuery,
        private cellValidationService: CellValidationService,
        private router: Router,
    ) {
        this.title = 'Verificação do celular';
        this.resendCode = false;
        this.nameSeller$ = this.sellerQuery.nameSeller$;
        this.cellSeller$ = this.sellerQuery.cellSeller$;
        this.isLoading$ = this.sellerQuery.isLoading$;

        this.initCellForm();
    }

    ngOnInit(): void {
        this.initCountDown();

        this.stepService.initStep({
            headerTitle: this.title,
            valueProgressBar: 2,
        });
    }

    public onSubmit(): void {
        if (this.cellForm.invalid) {
            return;
        }

        this.sendUserPhone({
            reset: false,
            ...this.cellForm.value,
        });
    }

    private sendUserPhone(userPhone: UserPhone): void {
        this.cellValidationService
            .postUserPhone(userPhone)
            .pipe(subscribeUntil(this))
            .subscribe(
                resp => {
                    if (resp?.success) {
                        this.nextStep();
                    }
                },
                () => {
                    this.initCountDown();
                },
            );
    }

    private nextStep(): void {
        this.router.navigate([`/form/${NavigationRoutes.Pro}`]);
    }

    public resendSMS(reset: boolean): void {
        this.cellValidationService
            .postUserPhone({ reset })
            .pipe(subscribeUntil(this))
            .pipe(finalize(() => this.initCountDown()))
            .subscribe();
    }

    private initCellForm(): void {
        this.cellForm = this.formBuilder.group({
            user_code: [
                '',
                [Validators.required, customMessage(Validators.minLength(4), 'O código deve ter 4 caracteres')],
            ],
        });
    }

    private initCountDown(minutes: number = 1): void {
        this.displayTimer$ = this.countdown(minutes)
            .pipe(subscribeUntil(this))
            .pipe(finalize(() => (this.resendCode = true)));
        this.resendCode = false;
    }

    private countdown(minutes: number, delay: number = 0): Observable<string> {
        return new Observable<string>((subscriber: Subscriber<string>) => {
            timer(delay, 1000)
                .pipe(subscribeUntil(this))
                .pipe(take(minutes * 60))
                .pipe(map(v => minutes * 60 - 1 - v))
                .pipe(takeWhile(x => x >= 0))
                .subscribe((countdown: number) => {
                    const minutes = Math.floor(countdown / 60);
                    const seconds = countdown - minutes * 60;

                    subscriber.next(`${('0' + minutes.toString()).slice(-2)}:${('0' + seconds.toString()).slice(-2)}`);

                    if (seconds <= 0 && minutes <= 0) {
                        subscriber.complete();
                    }
                });
        });
    }
}
