import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import {
    OperatorsService,
    OperatorsServiceMock,
    StoresService,
    StoresServiceMock,
} from '@picpay/seller-panel/services';
import { MatDialogMock, MatDialogRefMock } from '@picpay/angular/shared/helpers';

import { LoadingSpinnerComponent } from '@picpay/seller-panel/shared';
import { EventTracking } from '@picpay/event-tracking';

import { TransactionsFilterComponent } from './transactions-filter.component';

import { MockComponent, MockModule } from 'ng-mocks';
import { throwError } from 'rxjs';

describe('TransactionsFilterComponent', () => {
    let component: TransactionsFilterComponent;
    let fixture: ComponentFixture<TransactionsFilterComponent>;
    let operatorsService: OperatorsService;
    let storesService: StoresService;
    let matDialogRef: MatDialogRef<TransactionsFilterComponent>;

    const data = {
        period: 10,
        status_id: 'C',
        operator_ids: [
            { id: 0, username: 'Marcela Moreira', checked: false },
            { id: 1, username: 'Sérgio Prado', checked: true },
            { id: 2, username: 'Mario Delgado', checked: true },
            { id: 3, username: 'Dário da Duna', checked: true },
            { id: 4, username: 'Suzana Velez', checked: true },
            { id: 5, username: 'Fulano da Silva', checked: true },
        ],
        stores_ids: [
            {
                id: '123456',
                name: 'Telessena',
                checked: true,
            },
            {
                id: '123457',
                name: 'Ultragaz',
                checked: false,
            },
        ],
        date_init: '2021-05-25T00:00:00',
        date_end: '2021-05-30T00:00:00',
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MockModule(DesignSystemAngularModule),
                MockModule(MatGridListModule),
                MockModule(MatIconModule),
                MockModule(MatCheckboxModule),
                MockModule(MatDatepickerModule),
                MockModule(MatFormFieldModule),
            ],
            declarations: [TransactionsFilterComponent, MockComponent(LoadingSpinnerComponent)],
            providers: [
                { provide: OperatorsService, useClass: OperatorsServiceMock },
                { provide: StoresService, useClass: StoresServiceMock },
                { provide: MatDialog, useClass: MatDialogMock },
                { provide: MatDialogRef, useClass: MatDialogRefMock },
                { provide: MAT_DIALOG_DATA, useValue: data },
                DatePipe,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TransactionsFilterComponent);
        component = fixture.componentInstance;

        operatorsService = TestBed.inject(OperatorsService);
        storesService = TestBed.inject(StoresService);
        matDialogRef = TestBed.inject(MatDialogRef);

        component.currentPeriod = data.period;
        component.currentStatus = data.status_id;
        component.operators = data.operator_ids;
        component.allOperators = data.operator_ids;
        component.stores = data.stores_ids;
        component.allStores = data.stores_ids;
        component.initDate = data.date_init;
        component.endDate = data.date_end;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set valid form', () => {
        const form = component.form;

        expect(form).toBeDefined();
        expect(form.get(['period', 'status', 'operators', 'stores', 'dateFrom', 'dateTo'])).toBeDefined();

        expect(form.get('period').value).toBe(10);
        expect(form.get('status').value).toBe('C');
        expect(form.get('operators').value).toEqual([]);
        expect(form.get('stores').value).toEqual([]);
    });

    it('should change date format', () => {
        component.changeFormatDate('2021-05-16T00:00:00');
        expect(component.changeFormatDate('2021-05-16T00:00:00')).toBe('2021-05-16');
    });

    it('should return null if currentPeriod be defined', () => {
        component.returnNullIfCurrentPeriodIsSelected('2021-05-16T00:00:00');
        expect(component.returnNullIfCurrentPeriodIsSelected('2021-05-16T00:00:00')).toBeNull();
    });
    it('should initFormFilter on ngOnInit', () => {
        const initFormSpy = spyOn(component, 'initFormFilter');
        component.ngOnInit();

        expect(initFormSpy).toHaveBeenCalled();
    });

    it('should onKeyUp function', () => {
        const keyUpFunctionSpy = spyOn(component, 'onKeyUp').and.callThrough();
        const eventMock = {
            code: 'Space',
            srcElement: {
                click: () => {
                    /** */
                },
            },
        };

        component.onKeyUp(eventMock);

        expect(keyUpFunctionSpy).toHaveBeenCalled();
    });

    it('should call onChangePeriod function', () => {
        expect(component.currentPeriod).toEqual(10);
        component.onChangePeriod(30);

        expect(component.currentPeriod).toEqual(30);
        expect(component.form.get('dateFrom').value).toBe(null);
    });
    it('should call activeDataPicker function', () => {
        component.activeDataPicker();
        expect(component.form.get('period').value).toBe(null);
    });
    it('should onChangeStatus function', () => {
        expect(component.currentStatus).toEqual('C');

        component.onChangeStatus('R');

        expect(component.currentStatus).toEqual('R');
    });

    it('should onChangeOperator function', () => {
        const initialStateOperatorTest = component.operators[0].checked;

        component.onChangeOperator(0);

        expect(component.operators[0].checked).toBe(!initialStateOperatorTest);

        component.onChangeOperator(0);

        expect(component.operators[0].checked).toBe(initialStateOperatorTest);
    });

    it('should onClose function has been called', () => {
        const closeSpy = spyOn(component, 'onClose');
        const closeBtn = fixture.debugElement.query(By.css('.c-transactions-filter__header--close-button'));
        const cancelBtn = fixture.debugElement.query(By.css('.c-transactions-filter__footer--btn-cancel'));

        closeBtn.nativeElement.click();
        cancelBtn.nativeElement.click();

        expect(closeSpy).toHaveBeenCalled();
        expect(closeSpy).toHaveBeenCalledTimes(2);
    });

    it('should onClose function', () => {
        const closeSpy = spyOn(matDialogRef, 'close');

        component.onClose(false);

        expect(closeSpy).toHaveBeenCalledWith({
            resetFilter: false,
        });
    });

    it('should onFilterApply function', () => {
        const closeSpy = spyOn(matDialogRef, 'close');

        component.onFilterApply();

        expect(closeSpy).toHaveBeenCalled();
    });

    it('should have call eventTracking function', () => {
        const evtTracking = spyOn(EventTracking, 'track');
        const filters = {
            date_end: '2021-06-08T15:15:32.849Z',
            date_init: '2021-05-29T00:00:00',
        };
        component.eventTrackingFilters(filters);

        expect(evtTracking).toHaveBeenCalled();
    });

    it('should trigger onResize method when window is resized', () => {
        const resizeSpy = spyOn(component, 'onResize').and.callThrough();
        window.dispatchEvent(new Event('resize'));
        expect(resizeSpy).toHaveBeenCalled();
    });

    it('should have onSearchOperators function', () => {
        component.onSearchOperators('test search operators');

        expect(component.form.get('operators').value).toEqual([]);

        component.onSearchOperators('marcela');

        expect(component.form.get('operators').value).toEqual([false]);

        component.onSearchOperators('Sérgio');

        expect(component.form.get('operators').value).toEqual([true]);
    });

    it('should have loadOperators function { data.operator_ids > 0 }', () => {
        const operatorsServiceSpy = spyOn(operatorsService, 'getOperators');

        component.isSellerBiz = true;
        component.loadOperators();

        expect(component.allOperators).toEqual(data.operator_ids);
        expect(operatorsServiceSpy).not.toHaveBeenCalled();
    });

    it('should have loadOperators function { data.operator_ids = 0 }', () => {
        const operatorsServiceSpy = spyOn(operatorsService, 'getOperators').and.callThrough();

        component.isSellerBiz = true;
        component.data.operator_ids.length = 0;

        component.loadOperators();

        expect(operatorsServiceSpy).toHaveBeenCalledTimes(1);
        expect(component.allOperators).toMatchObject({
            meta: {
                code: 200,
            },
            data: {
                list: [
                    {
                        id: 0,
                        username: 'Operator test',
                        checked: false,
                    },
                ],
            },
        });
        expect(component.operators).toMatchObject({
            meta: {
                code: 200,
            },
            data: {
                list: [
                    {
                        id: 0,
                        username: 'Operator test',
                        checked: false,
                    },
                ],
            },
        });
    });

    it('should have loadOperators function (Error case)', () => {
        const operatorsServiceSpy = spyOn(operatorsService, 'getOperators').and.returnValue(
            throwError({ title: 'Ocorreu um erro ao carregar os operadores!' }),
        );

        component.isSellerBiz = true;
        component.data.operator_ids.length = 0;

        component.loadOperators();

        expect(operatorsServiceSpy).toHaveBeenCalledTimes(1);
        expect(component.operatorsLoaded).toBe(true);
    });

    it('should onChangeStore function', () => {
        const initialStateStoreTest = component.stores[0].checked;

        component.onChangeStore(0);

        expect(component.stores[0].checked).toBe(!initialStateStoreTest);

        component.onChangeStore(0);

        expect(component.stores[0].checked).toBe(initialStateStoreTest);
    });

    it('should have onSearchStores function', () => {
        component.onSearchStores('test search stores');

        expect(component.form.get('stores').value).toEqual([]);

        component.onSearchStores('Ultragaz');

        expect(component.form.get('stores').value).toEqual([false]);

        component.onSearchStores('Telessena');

        expect(component.form.get('stores').value).toEqual([true]);
    });

    it('should have loadStores function { data.stores_ids > 0 }', () => {
        component.isStore = true;
        component.loadStores();
        expect(component.allStores).toEqual(data.stores_ids);
    });

    it('should have loadStores function { data.stores_ids = 0 }', () => {
        const storesServiceSpy = spyOn(storesService, 'getStores').and.callThrough();

        component.isStore = true;
        component.data.store_ids = [];

        component.loadStores();

        expect(storesServiceSpy).toHaveBeenCalledTimes(1);
        expect(component.allStores).toEqual([
            {
                id: '123456',
                name: 'Telessena',
                checked: true,
            },
            {
                id: '123457',
                name: 'Ultragaz',
                checked: false,
            },
        ]);
        expect(component.stores).toEqual([
            {
                id: '123456',
                name: 'Telessena',
                checked: true,
            },
            {
                id: '123457',
                name: 'Ultragaz',
                checked: false,
            },
        ]);
    });

    it('should have loadStores function (Error case)', () => {
        const storesServiceSpy = spyOn(storesService, 'getStores').and.returnValue(
            throwError({ title: 'Ocorreu um erro ao carregar as lojas!' }),
        );

        component.isStore = true;
        component.data.store_ids = [];

        component.loadStores();

        expect(storesServiceSpy).toHaveBeenCalledTimes(1);
        expect(component.storesLoaded).toBe(true);
    });
});
