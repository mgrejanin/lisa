import { SellerState } from '../../models/seller.model';
import { SellerStore } from './seller.store';

describe('SellerStore', () => {
    let store: SellerStore;

    beforeEach(() => {
        store = new SellerStore();
    });

    it('should create an instance', () => {
        expect(store).toBeTruthy();
    });

    it('should have updateDataSeller function', () => {
        expect(store.updateDataSeller).toBeDefined();

        const spy = spyOn(store, 'update');

        const dataSeller: SellerState = {
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
        };

        store.updateDataSeller(dataSeller);

        expect(spy).toHaveBeenCalledWith(expect.any(Function));
    });
});
