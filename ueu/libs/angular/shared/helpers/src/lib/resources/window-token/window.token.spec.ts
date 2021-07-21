import { inject } from '@angular/core/testing';

import { WINDOW } from './window.token';

describe('WINDOW TOKEN', () => {
    it('should service work', inject([WINDOW], window => {
        expect(window).toBeTruthy();
    }));
});
