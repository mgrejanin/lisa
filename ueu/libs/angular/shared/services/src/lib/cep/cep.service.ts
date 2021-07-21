import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CepResponse } from '../models/cep.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CepService {
    private apiUrl = 'https://viacep.com.br/ws/';

    constructor(private http: HttpClient) {}

    getLocation(cep: string): Observable<CepResponse> {
        return this.http
            .get<CepResponse>(`${this.apiUrl}${cep}/json/`)
            .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
    }
}
