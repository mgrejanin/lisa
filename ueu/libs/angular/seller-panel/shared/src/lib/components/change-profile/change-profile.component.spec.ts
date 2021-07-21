import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { LocalStorageMock, WINDOW } from '@picpay/angular/shared/helpers';
import {
    ChangeProfileService,
    SellerGroupServiceMock,
    SellerService,
    SellerServiceMock,
} from '@picpay/seller-panel/services';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

import { MockComponents, MockModule } from 'ng-mocks';
import { throwError } from 'rxjs';

import { ChangeProfileComponent } from './change-profile.component';
import { FeedBackComponent } from '../feedback/feedback.component';

describe('ChangeProfileComponent', () => {
    let component: ChangeProfileComponent;
    let fixture: ComponentFixture<ChangeProfileComponent>;
    let sellerService: SellerService;
    let sellerGroupService: ChangeProfileService;
    let localStorageMock: LocalStorageMock;
    let windowToken: Window;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                MockModule(DesignSystemAngularModule),
                MockModule(MatIconModule),
                MockModule(MatFormFieldModule),
            ],
            declarations: [ChangeProfileComponent, MockComponents(LoadingSpinnerComponent, FeedBackComponent)],
            providers: [
                { provide: WINDOW, useValue: { location: { reload: jest.fn() } } },
                { provide: ChangeProfileService, useClass: SellerGroupServiceMock },
                { provide: SellerService, useClass: SellerServiceMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangeProfileComponent);
        component = fixture.componentInstance;
        localStorageMock = new LocalStorageMock();

        sellerService = TestBed.inject(SellerService);
        sellerGroupService = TestBed.inject(ChangeProfileService);
        windowToken = TestBed.inject(WINDOW);

        spyOn(localStorage, 'getItem').and.callFake(localStorageMock.getItem);
        spyOn(localStorage, 'setItem').and.callFake(localStorageMock.setItem);
        spyOn(localStorage, 'removeItem').and.callFake(localStorageMock.removeItem);
        spyOn(localStorage, 'clear').and.callFake(localStorageMock.clear);

        component.currentSeller = { organization: { id: 12345 } };
        component.sellers = [{ id: 27, name: 'supflex test' }];

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call ngOnInit', () => {
        const getSellersSpy = spyOn(component, 'getSellers');
        component.ngOnInit();

        expect(getSellersSpy).toHaveBeenCalled();
    });

    it('should have onSearchProfiles function', () => {
        component.onSearchProfiles('haha');
        expect(component.sellersFiltered).toEqual([]);
    });

    it('should have getSellers function', () => {
        component.getSellers();

        sellerGroupService.getSellers().subscribe(response => {
            expect(component.sellers).toEqual(response);
            expect((component.sellersFiltered = response));
            expect(component.loading).toBe(false);
        });
    });

    it('should have reloadPage function', () => {
        const windowReloadSpy = spyOn(windowToken.location, 'reload');

        component.reloadPage();

        expect(windowReloadSpy).toHaveBeenCalled();
    });

    it('should have getSellers function (Case Error)', (done: jest.DoneCallback) => {
        const sellerGroupServiceSpy = spyOn(sellerGroupService, 'getSellers').and.returnValue(throwError(''));

        component.getSellers();

        expect(sellerGroupServiceSpy).toHaveBeenCalled();

        sellerGroupService.getSellers().subscribe(
            () => done(),
            () => {
                expect(component.sellersFiltered).toEqual([]);
                expect(component.loadedError).toBe(true);
                expect(component.loading).toBe(false);
                done();
            },
        );
    });

    it('should have changeSeller function', (done: jest.DoneCallback) => {
        const sellerGroupServiceSpy = spyOn(sellerGroupService, 'changeSeller').and.callThrough();
        const reloadPageSpy = spyOn(component, 'reloadPage');
        const setSellerDataSpy = spyOn(sellerService, 'setSellerData');

        component.changeSeller(123);

        expect(sellerGroupServiceSpy).toHaveBeenCalled();

        sellerGroupService.changeSeller(123).subscribe(response => {
            expect(localStorage.getItem('token_transaction')).toEqual(response.token_transaction);
            expect(localStorage.getItem('token_biz')).toEqual(response.token_biz);
            expect(localStorage.getItem('token_refresh')).toEqual(response.token_refresh);
            expect(localStorage.getItem('token_refresh_expires_in')).toEqual(response.token_refresh_expires_in);
            expect(localStorage.getItem('token_transaction_expires_in')).toEqual(response.token_transaction_expires_in);
            expect(localStorage.getItem('original_login_seller')).toEqual(
                JSON.stringify(response.original_login_seller),
            );
            expect(setSellerDataSpy).toHaveBeenCalledWith(response.seller);

            expect(reloadPageSpy).toHaveBeenCalled();
            done();
        });
    });
});
