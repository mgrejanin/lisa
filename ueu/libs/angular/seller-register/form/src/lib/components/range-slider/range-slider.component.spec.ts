import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeSliderComponent } from './range-slider.component';

import { FeesService } from '../../services/fees/fees.service';
import { FeesServiceMock } from '../../mocks/fees.service.mock';
import { throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('RangeSliderComponent', () => {
    let component: RangeSliderComponent;
    let fixture: ComponentFixture<RangeSliderComponent>;
    let feesService: FeesService;

    const mockResponse = {
        data: {
            max_percentage: '4,89%',
            min_percentage: '0,00%',
            default_day: 30,
            list: [
                { id: 1, day: '1', percentage: 4.89, percentage_str: '4,89%' },
                { id: 32, day: '2', percentage: 4.71, percentage_str: '4,71%' },
                { id: 33, day: '3', percentage: 4.62, percentage_str: '4,62%' },
            ],
        },
    };

    const mockTaxes = mockResponse.data.list;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RangeSliderComponent],
            providers: [{ provide: FeesService, useClass: FeesServiceMock }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RangeSliderComponent);
        component = fixture.componentInstance;

        feesService = TestBed.inject(FeesService);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call the getTaxes() function', () => {
        const getTaxesSpy = spyOn(component, 'getTaxes');

        component.ngOnInit();
        expect(getTaxesSpy).toHaveBeenCalled();
    });

    it('should call the getFees() function and return correct response', () => {
        const feesServiceSpy = spyOn(feesService, 'getFees').and.callThrough();

        component.ngOnInit();

        expect(feesServiceSpy).toHaveBeenCalledTimes(1);
        expect(component.isLoading).toBe(false);
        expect(component.taxes).toEqual(mockTaxes);
    });

    it('should call the getFees() function and return an error', () => {
        const feesServiceSpy = spyOn(feesService, 'getFees').and.returnValue(throwError({}));

        component.ngOnInit();

        expect(feesServiceSpy).toHaveBeenCalledTimes(1);
        expect(component.isLoading).toBe(false);
        expect(component.responseError).toBe(true);
    });

    it('should call the getTaxesValues() function and return correct values', () => {
        component.getTaxesValues(mockResponse);

        expect(component.maxValueTax).toEqual(mockResponse.data.max_percentage);
        expect(component.minValueTax).toEqual(mockResponse.data.min_percentage);
    });

    it('should call the onInputChange() function and return correct days value', () => {
        const input = fixture.debugElement.query(By.css('.c-range-slider__input')).nativeElement as HTMLInputElement;
        component.onInputChange(input);

        expect(component.days).toBe(1);
    });

    it('should call the updateTax() function and return the initial value percentage', () => {
        const updateTaxSpy = spyOn(component, 'updateTax');

        component.ngOnInit();
        expect(updateTaxSpy).toHaveBeenCalledTimes(1);

        expect(component.taxPercentage).toEqual(mockTaxes[0].percentage_str);
    });

    it('should call the updateTax() function and return the selected day percentage', () => {
        component.updateTax(3);

        expect(component.taxPercentage).toEqual(mockTaxes[2].percentage_str);
    });

    it('should call the updatePointerPosition() function', () => {
        const input = fixture.debugElement.query(By.css('.c-range-slider__input')).nativeElement as HTMLInputElement;
        const updatePointerPositionSpy = spyOn(component, 'updatePointerPosition');

        component.onInputChange(input);
        expect(updatePointerPositionSpy).toHaveBeenCalledTimes(1);
    });

    it('should call the updatePointerPosition() function and return the correct pointerPosition value', () => {
        component.maxValue = 80;

        component.updatePointerPosition(10);

        expect(component.pointerPosition).toBe(11.39240506329114);
    });
});
