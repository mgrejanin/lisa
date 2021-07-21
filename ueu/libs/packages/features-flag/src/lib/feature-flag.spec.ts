import { FeatureFlag } from './feature-flag';

import { Feature, FFConfig } from './models';

jest.useFakeTimers();

describe('Feature Flag', () => {
    let config: FFConfig;
    const mockFeature = [
        { name: 'feature_boolean', type: 'B', value: 'true' },
        { name: 'feature_string', type: 'S', value: 'stringText' },
        { name: 'feature_json', type: 'J', value: '{"teste":123}' },
    ] as Feature[];

    beforeEach(() => {
        const isProd = false;
        const interval = 600000;

        config = new FFConfig(isProd, interval);
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    it('should be created', () => {
        expect(FeatureFlag).toBeDefined();
    });

    it('should have a init function internal default', () => {
        const initSpy = jest.spyOn(FeatureFlag, 'init');
        spyOn(FeatureFlag, 'fetchFeatures');

        const isProd = false;
        const interval = 5000;

        config = new FFConfig(isProd, interval);

        FeatureFlag.init({
            isProd: config.isProd,
            interval: config.interval,
        });

        expect(initSpy).toHaveBeenCalled();
        expect(FeatureFlag.config).toEqual(config);
    });

    it('should have a init function insert internal', () => {
        const initSpy = jest.spyOn(FeatureFlag, 'init');
        const fetchFeaturesSpy = spyOn(FeatureFlag, 'fetchFeatures');

        const isProd = false;
        const interval = 10000;

        config = new FFConfig(isProd, interval);

        FeatureFlag.init({
            isProd,
            interval,
        });

        expect(initSpy).toHaveBeenCalled();
        expect(FeatureFlag.config).toEqual(config);
        expect(fetchFeaturesSpy).toHaveBeenCalled();
    });

    it('should fetch features', () => {
        const fetchFeaturesSpy = jest.spyOn(FeatureFlag, 'fetchFeatures');
        const fetchRequestSpy = spyOn(FeatureFlag, 'fetchRequest');

        FeatureFlag.fetchFeatures();

        expect(fetchFeaturesSpy).toHaveBeenCalled();

        jest.runOnlyPendingTimers();

        expect(fetchRequestSpy).toHaveBeenCalled();
    });

    it('should send features', () => {
        const subjectSpy = jest.spyOn(FeatureFlag.subject, 'next');

        FeatureFlag.sendFeatures(mockFeature);

        expect(subjectSpy).toHaveBeenCalledWith(mockFeature);
    });

    it('should clear features', () => {
        const subjectSpy = jest.spyOn(FeatureFlag.subject, 'next');

        FeatureFlag.clearFeatures();

        expect(subjectSpy).toHaveBeenCalled();
    });

    it('should get features', () => {
        const getFeaturesSpy = jest.spyOn(FeatureFlag, 'getFeatures');

        FeatureFlag.getFeatures().subscribe((res: Feature[]) => {
            expect(res).toBeTruthy();
            expect(res.length).toBe(2);
        });

        FeatureFlag.sendFeatures(mockFeature);

        expect(getFeaturesSpy).toHaveBeenCalled();
    });

    it('should get feature boolean', () => {
        const getFeatureSpy = jest.spyOn(FeatureFlag, 'getFeature');

        FeatureFlag.getFeature('feature_boolean').subscribe((res: Feature) => {
            expect(res.name).toEqual('feature_boolean');
            expect(res.type).toEqual('B');
            expect(res.value).toEqual('true');
        });

        FeatureFlag.sendFeatures(mockFeature);

        expect(getFeatureSpy).toHaveBeenCalled();
    });

    it('should get feature string', () => {
        const getFeatureSpy = jest.spyOn(FeatureFlag, 'getFeature');

        FeatureFlag.getFeature('feature_string').subscribe((res: Feature) => {
            expect(res.name).toEqual('feature_string');
            expect(res.type).toEqual('S');
            expect(res.value).toEqual('stringText');
        });

        FeatureFlag.sendFeatures(mockFeature);

        expect(getFeatureSpy).toHaveBeenCalled();
    });

    it('should get feature string', () => {
        const getFeatureSpy = jest.spyOn(FeatureFlag, 'getFeature');

        FeatureFlag.getFeature('feature_json').subscribe((res: Feature) => {
            expect(res.name).toEqual('feature_json');
            expect(res.type).toEqual('J');
            expect(res.value).toEqual('{"teste":123}');
        });

        FeatureFlag.sendFeatures(mockFeature);

        expect(getFeatureSpy).toHaveBeenCalled();
    });

    it('should feature enabled boolean', () => {
        const featureSpy = jest.spyOn(FeatureFlag, 'isFeatureEnabled');

        FeatureFlag.isFeatureEnabled('feature_boolean').subscribe((res: boolean) => {
            expect(res).toBeTruthy();
            expect(res).toBe(true);
        });

        FeatureFlag.sendFeatures(mockFeature);

        expect(featureSpy).toHaveBeenCalled();
    });

    it('should feature enabled string', () => {
        const featureSpy = jest.spyOn(FeatureFlag, 'isFeatureEnabled');

        FeatureFlag.isFeatureEnabled('feature_string').subscribe((res: Feature) => {
            expect(res.name).toEqual('feature_string');
            expect(res.type).toEqual('S');
            expect(res.value).toEqual('stringText');
        });

        FeatureFlag.sendFeatures(mockFeature);

        expect(featureSpy).toHaveBeenCalled();
    });

    it('should feature enabled json', () => {
        const featureSpy = jest.spyOn(FeatureFlag, 'isFeatureEnabled');

        FeatureFlag.isFeatureEnabled('feature_json').subscribe((res: Feature) => {
            expect(res.name).toEqual('feature_json');
            expect(res.type).toEqual('J');
            expect(res.value).toEqual('{"teste":123}');
        });

        FeatureFlag.sendFeatures(mockFeature);

        expect(featureSpy).toHaveBeenCalled();
    });

    it('should feature parse JSON', () => {
        const featureSpy = jest.spyOn(FeatureFlag, 'featureParseJSON');

        FeatureFlag.featureParseJSON('feature_json').subscribe(res => {
            expect(res['teste']).toEqual(123);
        });

        FeatureFlag.sendFeatures(mockFeature);

        expect(featureSpy).toHaveBeenCalled();
    });

    it('should feature not parse JSON', () => {
        const featureSpy = jest.spyOn(FeatureFlag, 'featureParseJSON');

        FeatureFlag.featureParseJSON('feature_boolean').subscribe((res: Feature) => {
            expect(res.name).toEqual('feature_boolean');
            expect(res.type).toEqual('B');
            expect(res.value).toEqual('true');
        });

        FeatureFlag.sendFeatures(mockFeature);

        expect(featureSpy).toHaveBeenCalled();
    });

    it('should reload', () => {
        const featureSpy = jest.spyOn(FeatureFlag, 'featureParseJSON');
        const fetchRequestSpy = spyOn(FeatureFlag, 'fetchRequest');

        FeatureFlag.reload();

        expect(featureSpy).toHaveBeenCalled();
        expect(fetchRequestSpy).toHaveBeenCalled();
    });
});
