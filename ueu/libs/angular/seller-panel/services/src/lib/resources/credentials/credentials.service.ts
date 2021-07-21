import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SellerAccessConfig } from '../../config/seller-access.config';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    ProjectCredential,
    Credentials,
    InfoCredential,
    ClientSecret,
} from '../../models/credentials/credentials.model';

@Injectable()
export class CredentialsService {
    constructor(private http: HttpClient, protected config: CoreDataAccessService<SellerAccessConfig>) {}

    getInfoCredential(): Observable<InfoCredential> {
        return this.http.get<InfoCredential>(`${this.config.getConfig().apiUrl}/gatekeeper/b2p-credentials`).pipe(
            map(response => ({
                client_id: response[0]?.client_id,
                name: response[0]?.name,
                enabled: response[0]?.enabled,
            })),
        );
    }

    getClientSecret(ClientID: Credentials['client_id']): Observable<ClientSecret> {
        return this.http.get<ClientSecret>(`${this.config.getConfig().apiUrl}/gatekeeper/client-secret/${ClientID}`);
    }

    updateClientSecret(ClientID: Credentials['client_id']): Observable<ClientSecret> {
        return this.http.put<ClientSecret>(
            `${this.config.getConfig().apiUrl}/gatekeeper/client-secret/${ClientID}`,
            '',
        );
    }

    disableCredential(ClientID: Credentials['client_id']): Observable<void> {
        return this.http.put<void>(`${this.config.getConfig().apiUrl}/gatekeeper/disable-credential/${ClientID}`, '');
    }

    enableCredential(ClientID: Credentials['client_id']): Observable<void> {
        return this.http.put<void>(`${this.config.getConfig().apiUrl}/gatekeeper/enable-credential/${ClientID}`, '');
    }

    saveProjectCredential(project: ProjectCredential): Observable<Credentials> {
        return this.http.post<Credentials>(`${this.config.getConfig().apiUrl}/gatekeeper/b2p-credentials`, project);
    }
}
