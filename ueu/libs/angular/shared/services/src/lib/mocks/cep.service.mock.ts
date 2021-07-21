import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { CepResponse } from '../models/cep.model';

const getCepResponseMock: CepResponse = {
    cep: '05317-020',
    logradouro: 'Avenida Manuel Bandeira',
    complemento: '',
    bairro: 'Vila Leopoldina',
    localidade: 'São Paulo',
    uf: 'SP',
    ibge: '3550308',
    gia: '1004',
    ddd: '11',
    siafi: '7107',
};

export class CepServiceMock {
    getLocation(): Observable<CepResponse> {
        return of(getCepResponseMock).pipe(catchError((error: HttpErrorResponse) => throwError(error)));
    }
}
