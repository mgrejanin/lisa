/* eslint-disable @typescript-eslint/no-explicit-any */
import 'jest-preset-angular/setup-jest';

(window as any).ga = jest.fn();
(window as any).mixpanel = {
    track: jest.fn().mockImplementation(() => ({
        track: jest.fn(),
    })),
};
