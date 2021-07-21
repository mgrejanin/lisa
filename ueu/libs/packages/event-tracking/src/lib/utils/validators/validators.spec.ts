// models
import { EventTrackingUserType } from '../../models';

// classes
import { EventTrackingUtils, EventTrackingStorage } from '../';
import { EventTrackingValidators } from './validators';

describe('EventTrackingValidators', () => {
    let validators: EventTrackingValidators;
    let utils: EventTrackingUtils;
    let storage: EventTrackingStorage;

    beforeEach(() => {
        storage = new EventTrackingStorage();
        utils = new EventTrackingUtils(storage);
        validators = new EventTrackingValidators(utils);
    });

    it('should have isInitialized function (success)', () => {
        const getConfigSpy = jest.spyOn(utils, 'getConfig').mockImplementation(() => ({
            initialized: true,
            userType: EventTrackingUserType.CONSUMER,
            production: true,
        }));

        const mockMethodName = 'mockMethodName';

        expect(() => validators.isInitialized(mockMethodName)).not.toThrow();
        expect(getConfigSpy).toHaveBeenCalled();
    });

    it('should have isInitialized function (error)', () => {
        const getConfigSpy = jest.spyOn(utils, 'getConfig').mockImplementation(() => ({
            initialized: false,
            userType: EventTrackingUserType.CONSUMER,
            production: true,
        }));

        const mockMethodName = 'mockMethodName';

        expect(() => validators.isInitialized(mockMethodName)).toThrow(
            `You need to initialize the library with "init" method before calling "${mockMethodName}".`,
        );

        expect(getConfigSpy).toHaveBeenCalled();
    });

    it('should have hasEventName function (Valid event name)', () => {
        const mockMethodName = 'mockMethodName';

        // valid name following the manifesto
        expect(() => validators.isEventNameValid('Any Thing', mockMethodName)).not.toThrow();
    });

    it('should have hasEventName function (No event name passed)', () => {
        const mockMethodName = 'mockMethodName';

        expect(() => validators.isEventNameValid('', mockMethodName)).toThrow(
            `You need to have an event name to use "${mockMethodName}" method.`,
        );

        expect(() => validators.isEventNameValid(null, mockMethodName)).toThrow(
            `You need to have an event name to use "${mockMethodName}" method.`,
        );

        expect(() => validators.isEventNameValid(undefined, mockMethodName)).toThrow(
            `You need to have an event name to use "${mockMethodName}" method.`,
        );
    });

    it('should have hasEventName function (Event name not following the manifesto)', () => {
        const mockMethodName = 'mockMethodName';
        const defaultErrorMessage = 'follow the manifesto';

        // event name not following the manifesto
        expect(() => validators.isEventNameValid('123', mockMethodName)).toThrow(defaultErrorMessage);
        expect(() => validators.isEventNameValid('123 123', mockMethodName)).toThrow(defaultErrorMessage);
        expect(() => validators.isEventNameValid('Any 123', mockMethodName)).toThrow(defaultErrorMessage);
        expect(() => validators.isEventNameValid('any thing', mockMethodName)).toThrow(defaultErrorMessage);
        expect(() => validators.isEventNameValid('Any thing', mockMethodName)).toThrow(defaultErrorMessage);
        expect(() => validators.isEventNameValid('any Thing', mockMethodName)).toThrow(defaultErrorMessage);

        // valid name following the manifesto
        expect(() => validators.isEventNameValid('Any Thing', mockMethodName)).not.toThrow();
    });
});
