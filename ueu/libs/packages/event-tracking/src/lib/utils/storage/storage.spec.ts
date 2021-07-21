import { EventTrackingTrackingType } from '../../models';
import { EventTrackingStorage } from './storage';

describe('EventTrackingStorage', () => {
    let storage: EventTrackingStorage;

    beforeEach(() => {
        window.localStorage.__proto__.setItem = jest.fn();
        window.localStorage.__proto__.getItem = jest.fn();
        window.localStorage.__proto__.removeItem = jest.fn();

        storage = new EventTrackingStorage();
    });

    it('should have storeID function', () => {
        const userType = EventTrackingTrackingType.USER;
        const mockId = 'mockId';

        const expectedKey = `pp-event-tracking-${userType}-id`;

        const setSpy = jest.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation();

        storage.storeID(userType, mockId);

        expect(setSpy).toHaveBeenCalledWith(expectedKey, mockId);
    });

    it('should have getID function (has userId)', () => {
        const userType = EventTrackingTrackingType.USER;
        const mockId = 'mockId';

        const expectedKey = `pp-event-tracking-${userType}-id`;

        const expectedResult = { userId: mockId };

        const getSpy = jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key: string) => {
            return key === expectedKey ? mockId : null;
        });

        expect(storage.getID()).toEqual(expectedResult);
        expect(getSpy).toHaveBeenCalledTimes(1);
        expect(getSpy).toHaveBeenCalledWith(expectedKey);
    });

    it('should have getID function (no userId)', () => {
        const userType = EventTrackingTrackingType.ANONYMOUS;
        const mockId = 'mockId';

        const expectedKey = `pp-event-tracking-${userType}-id`;

        const expectedResult = { anonymousId: mockId };

        const getSpy = jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key: string) => {
            return key === expectedKey ? mockId : null;
        });

        expect(storage.getID()).toEqual(expectedResult);
        expect(getSpy).toHaveBeenCalledTimes(2);
        expect(getSpy).toHaveBeenCalledWith(expectedKey);
    });

    it('should have clearIds function (no userId)', () => {
        const anonymousKey = `pp-event-tracking-${EventTrackingTrackingType.ANONYMOUS}-id`;
        const userKey = `pp-event-tracking-${EventTrackingTrackingType.USER}-id`;

        const removeSpy = jest.spyOn(window.localStorage.__proto__, 'removeItem').mockImplementation();

        storage.clearIDs();

        expect(removeSpy).toHaveBeenCalledTimes(2);
        expect(removeSpy).toHaveBeenNthCalledWith(1, userKey);
        expect(removeSpy).toHaveBeenNthCalledWith(2, anonymousKey);
    });
});
