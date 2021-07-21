import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DatePipe } from '@angular/common';
import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { getISODateByDaysAgo, removeUndefinedNull, resetISODateHour } from '@picpay/angular/shared/helpers';
import { EventTracking } from '@picpay/event-tracking';
import { SellerUser } from '@picpay/seller-panel/helpers';
import {
    FormValueTransactions,
    OperatorsService,
    ReferrerUrlQuery,
    SellerQuery,
    StoresResponse,
    StoresService,
    TransactionFilters,
    TransactionsOperators,
    TransactionsStores,
} from '@picpay/seller-panel/services';

@Component({
    selector: 'seller-panel-transactions-filter',
    templateUrl: './transactions-filter.component.html',
    styleUrls: ['./transactions-filter.component.scss'],
})
export class TransactionsFilterComponent implements OnInit, OnDestroy {
    form: FormGroup;
    colBreakpoint = 2;

    currentPeriod: number;
    currentStatus: string;

    isSellerBiz: boolean;
    operatorsLoaded: boolean;
    isStore: boolean;
    storesLoaded: boolean;

    periodsList: { name: string; value: number }[];
    statusList: { name: string; value: string }[];
    operators: TransactionsOperators[];
    allOperators: TransactionsOperators[];
    stores: StoresResponse[];
    allStores: StoresResponse[];
    initDate: string;
    endDate: string;
    dateMax = resetISODateHour(new Date(Date.now()).toISOString(), true);

    private readonly unsubscribe$: Subject<void>;
    private readonly SPACEBAR_CODE = 'Space';

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: TransactionFilters,
        private dialogRef: MatDialogRef<TransactionsFilterComponent>,
        private formBuilder: FormBuilder,
        private operatorsService: OperatorsService,
        private storesService: StoresService,
        private sellerQuery: SellerQuery,
        private datePipe: DatePipe,
        private referrerUrlQuery: ReferrerUrlQuery,
    ) {
        this.periodsList = [
            {
                name: 'Hoje',
                value: 0,
            },
            {
                name: '5 dias',
                value: 5,
            },
            {
                name: '10 dias',
                value: 10,
            },
            {
                name: '15 dias',
                value: 15,
            },
            {
                name: '30 dias',
                value: 30,
            },
        ];

        this.statusList = [
            {
                name: 'Aprovadas',
                value: 'P',
            },
            {
                name: 'Completadas',
                value: 'C',
            },
            {
                name: 'Devolvidas',
                value: 'R',
            },
            {
                name: 'Não autorizadas',
                value: 'F',
            },
            {
                name: 'Canceladas',
                value: 'I',
            },
        ];

        this.currentPeriod = this.data.period;
        this.currentStatus = this.data.status;
        this.initDate = this.data.date_init;
        this.endDate = this.data.date_end;
        this.allOperators = [];
        this.operators = [];
        this.operatorsLoaded = false;
        this.storesLoaded = false;
        this.isSellerBiz = this.sellerQuery.getValue().organization?.type === SellerUser.BIZ;
        this.isStore = this.sellerQuery.getValue().store?.enabled;

        this.unsubscribe$ = new Subject();
    }

    ngOnInit(): void {
        this.initFormFilter();
        this.setNumberColsByWidth(window.innerWidth);
        this.loadOperators();
        this.loadStores();
    }

    initFormFilter(): void {
        this.form = this.formBuilder.group({
            period: this.currentPeriod || null,
            status: this.currentStatus,
            operators: new FormArray([]),
            stores: new FormArray([]),
            dateFrom: [this.initDate || this.returnNullIfCurrentPeriodIsSelected(getISODateByDaysAgo(30, true))],
            dateTo: [this.endDate || this.returnNullIfCurrentPeriodIsSelected(this.dateMax)],
        });
    }

    returnNullIfCurrentPeriodIsSelected(date: string): string {
        this.currentPeriod ? (date = null) : '';
        return date;
    }

    loadOperators(): void {
        if (this.isSellerBiz) {
            if (this.data?.operator_ids?.length > 0) {
                this.allOperators = this.data.operator_ids;
                this.operators = this.data.operator_ids;
                this.operatorsLoaded = true;
                this.buildOperatorsFilter();
            } else {
                this.operatorsService
                    .getOperators(localStorage.getItem('token_biz'))
                    .pipe(takeUntil(this.unsubscribe$))
                    .subscribe(
                        response => {
                            this.allOperators = response;
                            this.operators = response;
                            this.operatorsLoaded = true;
                            this.buildOperatorsFilter();
                        },
                        () => {
                            this.operatorsLoaded = true;
                        },
                    );
            }
        }
    }

    loadStores(): void {
        if (this.isStore) {
            this.storesService
                .getStores()
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe(
                    response => {
                        this.allStores = response;
                        this.stores = response;
                        this.storesLoaded = true;
                        this.buildStoresFilter();
                    },
                    () => {
                        this.storesLoaded = true;
                    },
                );
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event): void {
        let resizeId = null;

        clearTimeout(resizeId);
        resizeId = setTimeout(() => {
            this.setNumberColsByWidth(event.target.innerWidth);
        }, 250);
    }

    onKeyUp(event): void {
        if (event.code === this.SPACEBAR_CODE) {
            event.srcElement.click();
        }
    }

    onClose(isResetFilter = false): void {
        EventTracking.track('Dialog Interacted', {
            action: isResetFilter ? 'cancel' : 'close',
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Dialog Interacted',
        });

        this.dialogRef.close({
            resetFilter: isResetFilter,
        });
    }

    onChangePeriod(periodValue: number): void {
        this.currentPeriod = periodValue;
        this.form.controls.dateFrom.setValue(null);
        this.form.controls.dateTo.setValue(null);
    }

    activeDataPicker(): void {
        this.form.controls.period.setValue(null);
        this.currentPeriod = null;
    }

    onChangeStatus(value: string): void {
        this.currentStatus = value;
    }

    onChangeOperator(index): void {
        if (index <= this.operators.length) {
            this.operators[index].checked = !this.operators[index].checked;
        }
    }

    onChangeStore(index): void {
        if (index <= this.stores.length) {
            this.stores[index].checked = !this.stores[index].checked;
        }
    }

    filterArrayCurrentOperators(formValue: FormValueTransactions): TransactionsOperators[] {
        return formValue.operators.map((value, index) => ({
            id: this.operators[index].id,
            username: this.operators[index].username,
            checked: this.operators[index].checked,
        }));
    }

    filterArrayCurrentStores(formValue: FormValueTransactions): TransactionsStores[] {
        return formValue.stores.map((value, index) => ({
            id: this.stores[index].id,
            name: this.stores[index].name,
            checked: this.stores[index].checked,
        }));
    }

    changeFormatDate(date: string): string {
        return this.datePipe.transform(date, 'yyyy-MM-dd');
    }

    onFilterApply(): void {
        const formValue = this.form.value;
        let filters: TransactionFilters = {};

        const currentOperators = this.filterArrayCurrentOperators(formValue);
        const currentStores = this.filterArrayCurrentStores(formValue);

        if (this.form.get('period').value !== null) {
            filters.date_range = formValue.period;
        }

        if (this.form.get('dateFrom').value !== null && this.form.get('dateTo').value !== null) {
            filters.date_init = this.changeFormatDate(this.form.value.dateFrom);
            filters.date_end = this.changeFormatDate(this.form.value.dateTo);
        }

        filters.status = formValue.status;
        filters['operator_ids[]'] = currentOperators.filter(operator => operator.checked).map(operator => operator.id);
        filters['store_ids[]'] = currentStores.filter(store => store.checked).map(store => store.id);
        filters = removeUndefinedNull(filters);

        this.dialogCloseAndSendFilters(filters, currentOperators, currentStores, formValue);
        this.eventTrackingFilters(filters);
    }

    dialogCloseAndSendFilters(
        filters: TransactionFilters,
        currentOperators: TransactionsOperators[],
        currentStores: TransactionsStores[],
        formValue: FormValueTransactions,
    ): void {
        this.dialogRef.close({
            filters,
            currentOperators,
            currentStores,
            currentPeriod: formValue.period,
        });
    }

    eventTrackingFilters(filters: TransactionFilters): void {
        EventTracking.track('Filter Interacted', {
            user_id: this.sellerQuery.getValue().organization?.id,
            user_agent: window.navigator.userAgent,
            dialog_name: 'FILTRO',
            interaction_type: 'APLICADO',
            page_name: '/transacoes',
            page_title: document.title,
            page_url: `${window.origin}/transacoes`,
            referrer_url: `${window.origin}${this.referrerUrlQuery.getValue().url}`,
            search_parameters: [filters],
        });
    }

    onSearchOperators(value: string): void {
        value.trim().length
            ? (this.operators = this.allOperators.filter(operator => new RegExp(value, 'i').test(operator.username)))
            : (this.operators = this.allOperators);

        (this.form.get('operators') as FormArray).clear();

        this.buildOperatorsFilter();
    }

    onSearchStores(value: string): void {
        value.trim().length
            ? (this.stores = this.allStores.filter(store => new RegExp(value, 'i').test(store.name)))
            : (this.stores = this.allStores);

        (this.form.get('stores') as FormArray).clear();

        this.buildStoresFilter();
    }

    private buildOperatorsFilter(): void {
        if (this.operators?.length > 0) {
            this.operators.forEach(operator => {
                const control = new FormControl(operator.checked);
                (this.form.controls.operators as FormArray).push(control);
            });
        }
    }

    private buildStoresFilter(): void {
        if (this.stores?.length > 0) {
            this.stores.forEach(store => {
                const control = new FormControl(store.checked);
                (this.form.controls.stores as FormArray).push(control);
            });
        }
    }

    private setNumberColsByWidth(width): void {
        this.colBreakpoint = width <= 560 ? 1 : 2;
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
