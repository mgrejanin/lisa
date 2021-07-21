// classes
import { EventTrackingClass } from './event-tracking';
import { EventTrackingStorage, EventTrackingValidators, EventTrackingUtils } from './utils';

// models
import { EventTrackingConfig, EventTrackModel, EventTrackingUserType } from './models';

describe('Event tracking', () => {
    let eventTracking: EventTrackingClass;
    let validators: EventTrackingValidators;
    let storage: EventTrackingStorage;
    let utils: EventTrackingUtils;

    beforeEach(() => {
        /**
         * Creating the test environment
         */
        window.fetch = jest.fn();

        storage = new EventTrackingStorage();
        utils = new EventTrackingUtils(storage);
        validators = new EventTrackingValidators(utils);

        eventTracking = new EventTrackingClass(validators, storage, utils);
    });

    it('should create', () => {
        expect(eventTracking).toBeTruthy();
    });

    it('should have init function (PROD / WITH USER ID)', () => {
        const mergeConfigSpy = jest.spyOn(utils, 'mergeConfig');
        const getConfigSpy = jest.spyOn(utils, 'getConfig');
        const storeIDSpy = jest.spyOn(storage, 'storeID').mockImplementation();

        const mockConfig: EventTrackingConfig = {
            userId: 'MockUserId',
            userType: EventTrackingUserType.CONSUMER,
            production: true,
        };

        eventTracking.init(mockConfig);

        expect(mergeConfigSpy).toHaveBeenCalledWith(mockConfig);
        expect(getConfigSpy).toHaveBeenCalled();
        expect(storeIDSpy).toHaveBeenCalledWith('user', mockConfig.userId);
    });

    it('should have init function (PROD === false / NO USER ID)', () => {
        const mergeConfigSpy = jest.spyOn(utils, 'mergeConfig');
        const getConfigSpy = jest.spyOn(utils, 'getConfig');
        const storeIDSpy = jest.spyOn(storage, 'storeID').mockImplementation();

        const mockConfig: EventTrackingConfig = {
            userType: EventTrackingUserType.CONSUMER,
            production: false,
        };

        eventTracking.init(mockConfig);

        expect(mergeConfigSpy).toHaveBeenCalledWith(mockConfig);
        expect(getConfigSpy).toHaveBeenCalled();
        expect(storeIDSpy).not.toHaveBeenCalled();
    });

    it('should have login function', () => {
        const isInitializedSpy = jest.spyOn(validators, 'isInitialized').mockImplementation();
        const mergeConfigspy = jest.spyOn(utils, 'mergeConfig').mockImplementation();

        const mockUserId = 'mockUserId';
        eventTracking.login(mockUserId);

        expect(isInitializedSpy).toHaveBeenCalledWith('login');
        expect(mergeConfigspy).toHaveBeenCalledWith({ userId: mockUserId });
    });

    it('should have logout function', () => {
        const clearIDsSpy = jest.spyOn(storage, 'clearIDs').mockImplementation();
        const mergeConfigspy = jest.spyOn(utils, 'mergeConfig').mockImplementation();

        eventTracking.logout();

        expect(clearIDsSpy).toHaveBeenCalled();
        expect(mergeConfigspy).toHaveBeenCalledWith({ initialized: false });
    });

    // The next two tests are lacking the test of the fetch only
    it('should have page function', async () => {
        const mockConfig = { userType: EventTrackingUserType.SELLER, production: true };

        const isInitializedSpy = jest.spyOn(validators, 'isInitialized').mockImplementation();
        const isEventNameValidSpy = jest.spyOn(validators, 'isEventNameValid').mockImplementation();

        const utilsSpy = jest.spyOn(utils, 'getConfig').mockImplementation(() => mockConfig);

        const configureModelspy = jest.spyOn(utils, 'configureModel').mockImplementation();

        const mockEventName = 'mockEventName';
        const mockPayload = {};

        const expectedConfigureModelParams: EventTrackModel = {
            context: {
                browser: window?.navigator.userAgent,
            },
            name: mockEventName,
            properties: mockPayload,
            keyType: mockConfig.userType,
        };

        await eventTracking.page(mockEventName, mockPayload);

        expect(isInitializedSpy).toHaveBeenCalledWith('page');
        expect(isEventNameValidSpy).toHaveBeenCalledWith(mockEventName, 'page');
        expect(utilsSpy).toHaveBeenCalled();
        expect(configureModelspy).toHaveBeenCalledWith(expectedConfigureModelParams);
    });

    it('should have track function', async () => {
        const mockConfig = { userType: EventTrackingUserType.SELLER, production: true };

        const isInitializedSpy = jest.spyOn(validators, 'isInitialized').mockImplementation();
        const isEventNameValidSpy = jest.spyOn(validators, 'isEventNameValid').mockImplementation();

        const utilsSpy = jest.spyOn(utils, 'getConfig').mockImplementation(() => mockConfig);

        const configureModelspy = jest.spyOn(utils, 'configureModel').mockImplementation();

        const mockEventName = 'mockEventName';
        const mockPayload = {};

        const expectedConfigureModelParams: EventTrackModel = {
            context: {
                browser: window?.navigator.userAgent,
            },
            event: mockEventName,
            properties: mockPayload,
            keyType: mockConfig.userType,
        };

        await eventTracking.track(mockEventName, mockPayload);

        expect(isInitializedSpy).toHaveBeenCalledWith('track');
        expect(isEventNameValidSpy).toHaveBeenCalledWith(mockEventName, 'track');
        expect(utilsSpy).toHaveBeenCalled();
        expect(configureModelspy).toHaveBeenCalledWith(expectedConfigureModelParams);
    });
});
