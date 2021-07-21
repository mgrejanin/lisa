import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MockModule } from 'ng-mocks';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogMock } from '@picpay/angular/shared/helpers';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { AutoWithdrawalComponent } from './auto-withdrawal.component';
import { AutoWithdrawalQuery } from '../../state/auto-withdrawal/auto-withdrawal.query';
import { AutoWithdrawalService } from '../../state/auto-withdrawal/auto-withdrawal.service';
import { AutoWithdrawalServiceMock } from '../../state/auto-withdrawal/mocks/auto-withdrawal.service.mock';
import { AutoWithdrawalQueryMock } from '../../state/auto-withdrawal/mocks/query.mock';

describe('AutoWithdrawalComponent', () => {
    let component: AutoWithdrawalComponent;
    let fixture: ComponentFixture<AutoWithdrawalComponent>;
    let autoWithDrawalService: AutoWithdrawalService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AutoWithdrawalComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                HttpClientTestingModule,
                MockModule(MatDialogModule),
                MockModule(MatProgressSpinnerModule),
                MockModule(MatSlideToggleModule),
            ],
            providers: [
                { provide: AutoWithdrawalService, useClass: AutoWithdrawalServiceMock },
                { provide: MatDialog, useClass: MatDialogMock },
                { provide: AutoWithdrawalQuery, useClass: AutoWithdrawalQueryMock },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AutoWithdrawalComponent);
        component = fixture.componentInstance;

        autoWithDrawalService = TestBed.inject(AutoWithdrawalService);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have onLoadInformations function', () => {
        const onLoadInformationsSpy = spyOn(component, 'onLoadInformations');

        component.ngOnInit();

        expect(onLoadInformationsSpy).toHaveBeenCalledTimes(1);
    });

    it('should have onTryAgain function', () => {
        const onLoadInformationsSpy = spyOn(component, 'onLoadInformations');

        component.onTryAgain();

        expect(onLoadInformationsSpy).toHaveBeenCalledTimes(1);
    });

    it('should have onSetValue function', () => {
        const onSetValueSpy = spyOn(component, 'onSetValue');

        component.ngOnInit();
        component.checkControl = new FormControl(true);

        expect(onSetValueSpy).toHaveBeenCalledTimes(1);
        expect(component.checkControl.value).toEqual(true);
    });

    it('should have onToggle function', () => {
        const updateCheckSpy = spyOn(autoWithDrawalService, 'updateCheck');

        component.onToggle();

        expect(updateCheckSpy).toHaveBeenCalled();
    });
});
