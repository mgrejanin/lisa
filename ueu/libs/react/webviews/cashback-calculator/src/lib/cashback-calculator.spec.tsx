import React from 'react';
import { render } from '@testing-library/react';

import ReactWebviewsCashbackCalculator from './cashback-calculator';

describe('ReactWebviewsCashbackCalculator', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ReactWebviewsCashbackCalculator />);
        expect(baseElement).toBeTruthy();
    });
});
