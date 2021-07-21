import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CepService } from './cep.service';

describe('CepService', () => {
    let cepService: CepService;
    let httpMock: HttpTestingController;

    const apiUrl = 'https://viacep.com.br/ws';

    const validCep = '05317-020';
    const invalidCep = '99999-999';

    const mockResponse = {
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

    const mockError = {
        erro: true,
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CepService],
            imports: [HttpClientTestingModule],
        });
        cepService = TestBed.inject(CepService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(cepService).toBeTruthy();
    });

    it('shoud call getLocation() function and return a GET method', () => {
        const expectedUrl = `${apiUrl}/${validCep}/json/`;

        cepService.getLocation(validCep).subscribe(response => {
            expect(response).not.toBe(null);
            expect(response).toEqual(mockResponse);
        });

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockResponse);
        expect(request.request.method).toBe('GET');

        httpMock.verify();
    });

    it('should call getLocation() function and return an invalid cep error', () => {
        const expectedUrl = `${apiUrl}/${invalidCep}/json/`;

        cepService.getLocation(invalidCep).subscribe(response => {
            expect(response).not.toBe(null);
            expect(response).toEqual(mockError);
        });

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockResponse);
        expect(request.request.method).toBe('GET');

        httpMock.verify();
    });

    it('should call getLocation() function and throw an error', (done: jest.DoneCallback) => {
        const expectedUrl = `${apiUrl}/${invalidCep}/json/`;

        cepService.getLocation(invalidCep).subscribe(
            () => done(),
            () => done(),
        );

        const request = httpMock.expectOne(expectedUrl);
        request.error(new ErrorEvent('Not found'), { status: 404, statusText: 'Not found' });
        expect(request.request.method).toBe('GET');
    });
});
