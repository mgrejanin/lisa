import { Route } from '@angular/router';

// helper function used mostly to test guards

export const createMockRoute = (path: string): Route => ({
    path,
});
