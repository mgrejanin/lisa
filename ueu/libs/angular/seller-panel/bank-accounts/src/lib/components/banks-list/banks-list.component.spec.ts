import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSpinner } from '@angular/material/progress-spinner';

import { MockComponents, MockModule } from 'ng-mocks';
import { asapScheduler, scheduled } from 'rxjs';

import { WithdrawalsService, WithdrawalsServiceMock } from '@picpay/seller-panel/services';
import { FeedBackComponent } from '@picpay/seller-panel/shared';

import { Bank } from '../../models';

import { BanksListComponent } from './banks-list.component';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { BanksService } from '../../state/banks/banks.service';
import { StepperService } from '../../state/stepper/stepper.service';

describe('BanksListComponent', () => {
    let component: BanksListComponent;
    let fixture: ComponentFixture<BanksListComponent>;
    let stepperService: StepperService;
    let banksService: BanksService;
    let currentBankMock: Bank;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                HttpClientTestingModule,
                MockModule(MatFormFieldModule),
                MockModule(ScrollingModule),
                MockModule(MatIconModule),
            ],
            declarations: [BanksListComponent, MockComponents(FeedBackComponent, MatSpinner)],
            providers: [
                {
                    provide: WithdrawalsService,
                    useClass: WithdrawalsServiceMock,
                },
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
        fixture = TestBed.createComponent(BanksListComponent);
        component = fixture.componentInstance;

        banksService = TestBed.inject(BanksService);
        stepperService = TestBed.inject(StepperService);

        currentBankMock = {
            id: '104',
            name: 'CAIXA ECONOMICA FEDERAL',
            img_url: '/assets/icons/bank.svg',
            form_config: {
                account_limit: 12,
                account_types: [
                    {
                        label: 'Conta corrente pessoa física - 001',
                        value: '001',
                        legal_nature: 'PF',
                    },
                    {
                        label: 'Conta corrente pessoa jurídica - 003',
                        value: '003',
                        legal_nature: 'PJ',
                    },
                    {
                        label: 'Conta poupança pessoa física - 013',
                        value: '013',
                        legal_nature: 'PF',
                    },
                    {
                        label: 'Conta poupança pessoa jurídica - 022',
                        value: '022',
                        legal_nature: 'PJ',
                    },
                    {
                        label: 'Conta Caixa Fácil - 023',
                        value: '023',
                        legal_nature: 'PF',
                    },
                ],
                branch_limit: 4,
            },
        };

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have onClearValue function', () => {
        const resetSpy = spyOn(component.bankValue, 'reset');
        const getBanksSpy = spyOn(component, 'onGetBanks');

        component.onClearValue();

        expect(resetSpy).toHaveBeenCalled();
        expect(getBanksSpy).toHaveBeenCalled();
    });

    it('should have onClickBankItem function', () => {
        const stepperServiceSpy = spyOn(stepperService, 'updateSelectingBank');
        const banksServiceSpy = spyOn(banksService, 'setSelectedBank');

        component.onClickBankItem(currentBankMock);

        expect(stepperServiceSpy).toHaveBeenCalledWith(false);
        expect(banksServiceSpy).toHaveBeenCalledWith(currentBankMock);
    });

    it('should have onGetBanks function', () => {
        const banksServiceSpy = spyOn(banksService, 'getBanks').and.returnValue(scheduled<Bank[]>([[]], asapScheduler));

        component.onGetBanks('');

        expect(banksServiceSpy).toHaveBeenCalledWith('');

        component.onGetBanks('CAIXA');

        expect(banksServiceSpy).toHaveBeenCalledWith('CAIXA');
    });

    it('should have onSearch function', fakeAsync(() => {
        const getBanksSpy = spyOn(component, 'onGetBanks');

        component.inputSearchBank.nativeElement.value = 'CAIXA';
        component.inputSearchBank.nativeElement.dispatchEvent(new Event('input'));

        tick(500);
        fixture.detectChanges();

        expect(getBanksSpy).toHaveBeenCalled();
    }));
});
