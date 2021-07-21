import { RechargesStore } from './recharges.store';

// interfaces
import { mockRechargeData } from './mocks/recharges.query.mock';
import { RechargeData } from '../../models';

describe('RechargesStore', () => {
    let store: RechargesStore;

    const rechargeUpdateRequestMock: Partial<RechargeData> = {
        id: '5fe1ecfda719fa46d62d38b2',
        comments: [''],
        value: 1000,
        value_srt: '100,000',
    };

    beforeEach(() => {
        store = new RechargesStore();

        store.updateRecharges(mockRechargeData);
    });

    it('should create an instance', () => {
        expect(store).toBeTruthy();
    });

    it('should have updateRecharges function', () => {
        const updateSpy = spyOn(store, 'update');

        store.updateRecharges(mockRechargeData);

        expect(updateSpy).toHaveBeenCalledWith({ recharges: mockRechargeData });
    });

    it('should have updateTotal function', () => {
        const updateSpy = spyOn(store, 'update');

        const total = 2;

        store.updateTotalRecharges(total);

        expect(updateSpy).toHaveBeenCalledWith({ totalRecharges: total });
    });

    it('should have updateRecharge function', () => {
        const updateSpy = spyOn(store, 'update');

        store.updateRecharge(rechargeUpdateRequestMock);

        expect(updateSpy).toHaveBeenCalledWith({
            recharges: [...mockRechargeData],
        });
    });
});
