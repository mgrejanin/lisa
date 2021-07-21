import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SellerQuery } from '@picpay/seller-register/form';
import { switchMap, take } from 'rxjs/operators';
import { TypeToken } from '../../models/request.interceptor.model';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    private tokenHash$: Observable<Pick<TypeToken, 'hash' | 'token'>>;

    constructor(private sellerQuery: SellerQuery) {
        this.tokenHash$ = this.sellerQuery.tokenHash$;
    }

    intercept(req: HttpRequest<HttpClient>, next: HttpHandler): Observable<HttpEvent<HttpHandler>> {
        return this.tokenHash$.pipe(
            take(1),
            switchMap(resp => {
                const { token, hash } = resp;
                let dupReq: HttpRequest<HttpClient | unknown>;

                if (!token) {
                    dupReq = this.addHashBody(req, hash);
                } else {
                    dupReq = this.addHeaderToken(req, token);
                }

                return next.handle(dupReq);
            }),
        );
    }

    private addHeaderToken(req: HttpRequest<HttpClient>, token: string) {
        return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
    private addHashBody(req: HttpRequest<HttpClient>, hash: string) {
        return req.clone({ body: { ...req.body, hash } });
    }
}
