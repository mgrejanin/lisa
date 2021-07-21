import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { subscribeUntil } from '@picpay/angular/shared/helpers';
import { finalize } from 'rxjs/operators';
import { FeesResponse, Fees } from '../../models/fees-response.model';
import { FeesService } from '../../services/fees/fees.service';

@Component({
    selector: 'seller-register-range-slider',
    templateUrl: './range-slider.component.html',
    styleUrls: ['./range-slider.component.scss'],
})
export class RangeSliderComponent implements OnInit {
    isLoading: boolean;
    responseError: boolean;

    minValue: number;
    maxValue: number;

    taxes: Fees[];
    minValueTax: string;
    maxValueTax: string;
    taxPercentage: string;

    days: number;
    initialValue: number;
    pointerPosition: number;

    @Output() selectedValueEvent: EventEmitter<number>;

    constructor(private feesService: FeesService) {
        this.minValue = 1;
        this.days = 1;
        this.initialValue = 1;
        this.pointerPosition = 0;
        this.selectedValueEvent = new EventEmitter();
    }

    ngOnInit(): void {
        this.loadGetFees();
    }

    loadGetFees(): void {
        this.isLoading = true;

        this.feesService
            .getFees()
            .pipe(
                subscribeUntil(this),
                finalize(() => (this.isLoading = false)),
            )
            .subscribe(
                response => {
                    this.getTaxes(response);
                },
                () => {
                    this.responseError = true;
                },
            );
    }

    getTaxes(response: FeesResponse): void {
        const list = response?.data?.list;

        this.taxes = list;
        this.maxValue = list.length;

        this.getTaxesValues(response);
        this.updateTax(this.initialValue);
    }

    getTaxesValues(response: FeesResponse): void {
        this.maxValueTax = response?.data?.max_percentage;
        this.minValueTax = response?.data?.min_percentage;
    }

    onInputChange(inputValue: HTMLInputElement): void {
        const value = Number(inputValue?.value);

        this.days = value;
        this.updateTax(value);
        this.updatePointerPosition(value);
        this.selectedValueEvent.emit(value);
    }

    updateTax(value: number): void {
        const [tax] = this.taxes.filter(({ day }) => day === value.toString());
        this.taxPercentage = tax.percentage_str;
    }

    updatePointerPosition(value: number): void {
        const range = this.maxValue - this.minValue;
        const absValue = value - this.minValue;
        const percentage = (absValue / range) * 100;

        this.pointerPosition = percentage;
    }
}
