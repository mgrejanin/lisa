import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';

import { BanksQuery } from '../../state/banks/banks.query';
import { Bank } from '../../models';

import { BanksService } from '../../state/banks/banks.service';
import { StepperService } from '../../state/stepper/stepper.service';

@Component({
    selector: 'seller-panel-banks-list',
    templateUrl: './banks-list.component.html',
    styleUrls: ['./banks-list.component.scss'],
})
export class BanksListComponent implements OnInit, OnDestroy {
    bankValue: FormControl;
    banksList$: Observable<Bank[]>;
    loadingBanks$: Observable<boolean>;
    loadingBanksFailed$: Observable<boolean>;

    @ViewChild('inputSearchBank', { static: true }) inputSearchBank: ElementRef<HTMLInputElement>;

    private searchBank$: Observable<string>;
    private readonly unsubscribe$: Subject<void>;

    constructor(
        private banksService: BanksService,
        private banksQuery: BanksQuery,
        private stepperService: StepperService,
    ) {
        this.loadingBanks$ = this.banksQuery.isLoading$;
        this.loadingBanksFailed$ = this.banksQuery.loadedError$;

        this.banksList$ = this.banksQuery.banks$;

        this.bankValue = new FormControl('');

        this.unsubscribe$ = new Subject();
    }

    ngOnInit(): void {
        this.onGetBanks();
        this.onSearch();
    }

    onClearValue() {
        this.bankValue.reset();
        this.onGetBanks();
    }

    onClickBankItem(bank: Bank): void {
        this.banksService.setSelectedBank(bank);
        this.stepperService.updateSelectingBank(false);
    }

    onGetBanks(key = ''): void {
        this.banksService.getBanks(key).pipe(takeUntil(this.unsubscribe$)).subscribe();
    }

    onSearch(): void {
        this.searchBank$ = fromEvent(this.inputSearchBank.nativeElement, 'input').pipe(
            debounceTime(500),
            distinctUntilChanged(),
            map((event: KeyboardEvent) => (event.target as HTMLInputElement).value),
            takeUntil(this.unsubscribe$),
        );

        this.searchBank$.pipe(takeUntil(this.unsubscribe$)).subscribe((key: string) => {
            this.onGetBanks(key);
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
