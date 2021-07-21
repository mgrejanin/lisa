import * as http from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { VariablesQuery } from './variables/variables.query';

@Injectable()
export class OpsDashVariablesInterceptor implements http.HttpInterceptor {
    private readonly environment$: Observable<string>;

    constructor(private variablesQuery: VariablesQuery) {
        this.environment$ = this.variablesQuery.environment$;
    }

    intercept(req: http.HttpRequest<unknown>, next: http.HttpHandler): Observable<http.HttpEvent<unknown>> {
        return this.environment$.pipe(
            take(1),
            switchMap(environment => {
                let headers = req.headers;

                headers = headers.set('Content-Type', 'application/json');
                headers = headers.set('X-Stage', environment);

                const requestCopy = req.clone({
                    headers,
                });

                return next.handle(requestCopy);
            }),
        );
    }
}
