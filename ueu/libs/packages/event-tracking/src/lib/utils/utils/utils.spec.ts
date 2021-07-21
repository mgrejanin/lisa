import { EventTrackingStorage, EventTrackingUtils } from '../';
import { EventTrackingTrackingType, EventTrackingUserType, EventTrackModel } from '../../models';

describe('EventTrackingUtils', () => {
    let storage: EventTrackingStorage;
    let utils: EventTrackingUtils;

    beforeEach(() => {
        storage = new EventTrackingStorage();
        utils = new EventTrackingUtils(storage);
    });

    it('should create', () => {
        expect(utils).toBeTruthy();
    });

    it('should have configureModel function (has user id)', () => {
        const mockId = 'mockId';
        const mockGetIdValue = { userId: mockId };

        const getIdSpy = jest.spyOn(storage, 'getID').mockImplementation(() => mockGetIdValue);
        const mergeConfigSpy = jest.spyOn(utils, 'mergeConfig');

        const mockTrackModel: EventTrackModel = {
            userId: null,
            anonymousId: null,
            context: {},
            event: 'mockEventName',
            properties: {},
            keyType: EventTrackingUserType.CONSUMER,
        };

        const expectedTrackModel: EventTrackModel = {
            userId: mockId,
            anonymousId: null,
            context: {},
            event: 'mockEventName',
            properties: {},
            keyType: EventTrackingUserType.CONSUMER,
        };

        const result = utils.configureModel(mockTrackModel);

        expect(getIdSpy).toHaveBeenCalled();
        expect(mergeConfigSpy).toHaveBeenLastCalledWith(mockGetIdValue);
        expect(result).toEqual(expectedTrackModel);
    });

    it('should have configureModel function (has anonymous id)', () => {
        const mockId = 'mockId';
        const mockGetIdValue = { anonymousId: mockId };

        const getIdSpy = jest.spyOn(storage, 'getID').mockImplementation(() => mockGetIdValue);
        const mergeConfigSpy = jest.spyOn(utils, 'mergeConfig');

        const mockTrackModel: EventTrackModel = {
            userId: null,
            anonymousId: null,
            context: {},
            event: 'mockEventName',
            properties: {},
            keyType: EventTrackingUserType.CONSUMER,
        };

        const expectedTrackModel: EventTrackModel = {
            anonymousId: mockId,
            userId: null,
            context: {},
            event: 'mockEventName',
            properties: {},
            keyType: EventTrackingUserType.CONSUMER,
        };

        const result = utils.configureModel(mockTrackModel);

        expect(getIdSpy).toHaveBeenCalled();
        expect(mergeConfigSpy).toHaveBeenLastCalledWith(mockGetIdValue);
        expect(result).toEqual(expectedTrackModel);
    });

    it('should have configureModel function (no user id / no anonymous id)', () => {
        const mockGetIdValue = { anonymousId: undefined };

        const getIdSpy = jest.spyOn(storage, 'getID').mockImplementation(() => mockGetIdValue);
        const storeIdSpy = jest.spyOn(storage, 'storeID').mockImplementation();
        const mergeConfigSpy = jest.spyOn(utils, 'mergeConfig');

        const mockTrackModel: EventTrackModel = {
            userId: null,
            anonymousId: null,
            context: {},
            event: 'mockEventName',
            properties: {},
            keyType: EventTrackingUserType.CONSUMER,
        };

        const expectedTrackModel: EventTrackModel = {
            context: {},
            event: 'mockEventName',
            properties: {},
            keyType: EventTrackingUserType.CONSUMER,
        };

        const result = utils.configureModel(mockTrackModel);

        expect(getIdSpy).toHaveBeenCalled();
        expect(mergeConfigSpy).toHaveBeenLastCalledWith(mockGetIdValue);
        expect(storeIdSpy).toHaveBeenCalledWith(EventTrackingTrackingType.ANONYMOUS, result.anonymousId);

        // checks if anonymous id is defined, because we cannot
        // mock or make a identical object because of the uuid lib
        expect(result.anonymousId).toBeDefined();
        expect(result).toEqual(expect.objectContaining(expectedTrackModel));
    });

    it('should have getConfig function (default value)', () => {
        const config = utils.getConfig();
        const expectedConfig = {};

        expect(config).toEqual(expectedConfig);
    });

    it('should have mergeConfig function (any new asigned value)', () => {
        // this is done to ensure the test will
        // still be valid if the default value changes
        // and to validade that the getConfig is not
        // freezing the class variable object.
        const defaultConfig = utils.getConfig();

        const mockConfig = { ...defaultConfig, production: true };

        const expectedConfig = {
            ...mockConfig,
            initialized: true,
        };

        // updating the config value
        utils.mergeConfig(mockConfig);

        const config = utils.getConfig();

        expect(config).toEqual(expectedConfig);
    });
});
