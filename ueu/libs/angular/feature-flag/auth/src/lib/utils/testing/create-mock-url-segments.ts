// helper function used mostly to test guards

import { UrlSegment } from '@angular/router';

export const createMockUrlSegments = (path: string): UrlSegment[] => [
    {
        path,
        parameters: null,
        parameterMap: null,
    },
];
