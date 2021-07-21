import { TestBed } from '@angular/core/testing';

// modules
import { HttpClientTestingModule } from '@angular/common/http/testing';

// services
import { PicpayKeycloakConfigService, PicpayKeycloakService } from '@picpay/keycloak';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { KeycloakCallback } from './keycloack-callback.service';
import { KeycloakService } from 'keycloak-angular';

describe('KeycloackCallback', () => {
    let keycloackCallback: KeycloakCallback;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                KeycloakCallback,
                PicpayKeycloakService,
                KeycloakService,
                {
                    provide: PicpayKeycloakConfigService,
                    useValue: {
                        realm: 'realm',
                        clientId: 'clientid',
                        url: 'URL',
                        notAllowedRouteRedirectTo: 'URL',
                        withCallback: false,
                    },
                },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com', release: 'qa' }),
                    },
                },
            ],
        });

        keycloackCallback = TestBed.inject(KeycloakCallback);
    });

    it('should be created', () => {
        expect(keycloackCallback).toBeTruthy();
    });

    it('should have a callback function', () => {
        expect(keycloackCallback.callback).toBeDefined();
    });
});
