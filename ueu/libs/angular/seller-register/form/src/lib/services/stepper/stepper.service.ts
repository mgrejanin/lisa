import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, Event, NavigationEnd, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { SellerQuery } from '../../data-access';
import { getNavigationStep, Navigate, NavigationRoutes } from '../../models/navigation.model';

@Injectable({
    providedIn: 'root',
})
export class StepperService {
    private readonly step$: Observable<number | null | undefined>;
    private history: string[];

    constructor(private sellerQuery: SellerQuery, private router: Router) {
        this.step$ = this.sellerQuery.step$;
        this.history = [];
        this.loadRouting();
    }

    authStep(routeSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this.step$.pipe(
            take(1),
            map((lastStep: number) => {
                const lastStepUser: Navigate = this.getLastStepUser(lastStep);
                const stepRoute: Navigate = routeSnapshot?.data as Navigate;

                if (isDevMode()) {
                    return true;
                }

                if (this.history.length === 0) {
                    this.history.push(state.url);

                    if (!lastStep) {
                        return this.router.parseUrl(`/form`);
                    } else {
                        return this.router.parseUrl(`/form/${NavigationRoutes.GoodYouBack}`);
                    }
                }

                if (stepRoute?.step > lastStep) {
                    return this.router.parseUrl(`/form/${lastStepUser?.path}`);
                }

                return true;
            }),
        );
    }

    getLastStepUser(lastStep: number): Navigate {
        const routes: Navigate[] = getNavigationStep();
        const lastStepUser = routes.find(route => route.step === lastStep);

        return lastStepUser;
    }

    loadRouting(): void {
        this.router.events
            .pipe(filter((event: Event) => event instanceof NavigationEnd))
            .subscribe(({ urlAfterRedirects }: NavigationEnd) => {
                this.history = [...this.history, urlAfterRedirects];
            });
    }
}
