import { ActivatedRouteSnapshot } from '@angular/router';

export const createMockActivatedRouteSnapshot = (roles: string[]): ActivatedRouteSnapshot => {
    // tslint:disable-next-line: no-object-literal-type-assertion
    const routeData: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    routeData.data = { roles };
    return routeData;
};
