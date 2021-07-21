import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class DevPortalInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<HttpClient>, next: HttpHandler): Observable<HttpEvent<HttpHandler>> {
        const dupReq = req.clone({
            headers: req.headers.set('Api-Key', environment.apiKey),
        });
        return next.handle(dupReq);
    }
}
