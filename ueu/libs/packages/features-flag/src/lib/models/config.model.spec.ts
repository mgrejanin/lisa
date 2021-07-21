import { FFConfig } from './config.model';

describe('FFConfig', () => {
    it('should be created', () => {
        const isProd = false;
        const interval = 600000;
        const config = new FFConfig(isProd, interval);

        expect(config).toBeTruthy();
        expect(config.isProd).toBe(isProd);
        expect(config.interval).toBe(interval);
    });
});
