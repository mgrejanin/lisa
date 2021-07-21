// helper function used mostly to test guards

import { RouterStateSnapshot } from '@angular/router';

export const createMockRouteState = (mockUrl: string): RouterStateSnapshot =>
    (({
        url: mockUrl,
    } as unknown) as RouterStateSnapshot);
