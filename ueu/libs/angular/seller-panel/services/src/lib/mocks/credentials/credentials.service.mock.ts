import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InfoCredential } from '../../models';

export const saveCredentialsMock: { project_name: string; callback_url: string } = {
    project_name: 'Nome da promo',
    callback_url: 'http://promo.com/callback',
};

export const credentialsMock: InfoCredential = {
    name: 'Principal',
    client_id: '2b50132f-bae2-458e-9609-e2d5aa0b10ff',
    enabled: true,
};

export const secretMock = {
    client_secret: 'dba3ea1b-0565-4503-8dae-691485613930',
};

export const updateSecretMock = {
    client_secret: '10482307-3c1d-4fd1-99a5-1ca0c790ac5a',
};

export const projectMock = {
    project_name: 'Nome da promo',
    callback_url: 'http://promo.com/callback',
};

export const projectMockResponse = {
    name: 'PROMO Teste',
    description: null,
    client_id: '30168b8f-8db0-41a2-b29d-da8a0776054a',
    environment: 'production',
    scopes: [
        {
            id: '9c8098a3-f356-49c7-8524-974a258bfe86',
            name: 'b2p.transfer',
            description: null,
        },
    ],
    api_key: 'qBOJJxGJf5xBaflVEDQmU3FLR1b3Vc1W',
    updated_at: '2021-01-19 11:12:10',
    created_at: '2021-01-19 11:12:10',
    _id: '6006e8baa7bc080af04a4e12',
};

export class CredentialsServiceMock {
    getInfoCredential() {
        return of(credentialsMock);
    }
    getClientSecret(clientID: string) {
        return of(secretMock);
    }
    updateClientSecret(clientID: string) {
        return of(updateSecretMock);
    }
    disableCredential(clientID: string) {
        return of('');
    }
    enableCredential(clientID: string) {
        return of('');
    }
    saveProjectCredential(project) {
        return of(projectMockResponse);
    }
}

const getInfoCredentialMock: InfoCredential = {
    name: '',
    client_id: '',
    enabled: undefined,
};

export class CredentialsServiceEmptyMock {
    getInfoCredential() {
        return of(getInfoCredentialMock);
    }
}

export class CredentialsServiceFailedMock {
    getInfoCredential() {
        return of(undefined);
    }
    enableCredential(clientID: string) {
        return throwError('error');
    }
    disableCredential(clientID: string) {
        return throwError('error');
    }
    updateClientSecret(clientID: string) {
        return throwError('error');
    }
}
