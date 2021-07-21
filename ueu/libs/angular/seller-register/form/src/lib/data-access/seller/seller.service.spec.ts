import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SellerQuery } from './seller.query';
import { SellerService } from './seller.service';
import { SellerStore } from './seller.store';

describe('SellerService', () => {
    let sellerService: SellerService;
    let sellerStore: SellerStore;
    let sellerQuery: SellerQuery;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SellerService, SellerStore],
            imports: [HttpClientTestingModule],
        });

        sellerService = TestBed.inject(SellerService);
        sellerStore = TestBed.inject(SellerStore);
        sellerQuery = TestBed.inject(SellerQuery);
    });

    it('should be created', () => {
        expect(sellerService).toBeDefined();
    });

    it('should have updateDataSeller function', (done: jest.DoneCallback) => {
        const storeSpy = spyOn(sellerStore, 'updateDataSeller');

        sellerService.updateDataSeller({
            step: 1,
            responsible: {
                user_name: 'User Test',
                user_email: 'email@test.com',
                user_cell_number: '(99) 99999-9999',
                user_birthday: '01/01/01',
                user_document: '12345678901',
                user_mother: 'Mae Teste',
                recaptcha: '',
            },
        });

        expect(storeSpy);
        sellerQuery.sellerCompany$.subscribe(() => done());
    });

    it('should have setLoading function', (done: jest.DoneCallback) => {
        const storeSpy = spyOn(sellerStore, 'setLoading');

        sellerService.setLoading(true);

        expect(storeSpy);
        sellerQuery.isLoading$.subscribe(() => done());
    });

    it('should have resetSeller function', (done: jest.DoneCallback) => {
        const storeSpy = spyOn(sellerStore, 'reset');

        sellerService.resetSeller();

        expect(storeSpy);
        sellerQuery.sellerCompany$.subscribe(() => done());
    });
});
