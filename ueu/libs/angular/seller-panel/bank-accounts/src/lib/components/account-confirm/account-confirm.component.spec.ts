import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockPipe } from 'ng-mocks';

import { SellerService, SellerServiceMock } from '@picpay/seller-panel/services';
import { CpfCnpjPipe } from '@picpay/angular/shared/pipes';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { AccountConfirmComponent } from './account-confirm.component';

describe('AccountConfirmComponent', () => {
    let component: AccountConfirmComponent;
    let fixture: ComponentFixture<AccountConfirmComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [AccountConfirmComponent, MockPipe(CpfCnpjPipe)],
            providers: [
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
                {
                    provide: SellerService,
                    useClass: SellerServiceMock,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountConfirmComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
