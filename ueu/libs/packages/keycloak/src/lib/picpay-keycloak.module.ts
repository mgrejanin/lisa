import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { PicpayKeycloakConfig, PicpayKeycloakConfigService } from './picpay-keycloak.config';
import { PicpayKeycloakGuard } from './picpay-keycloak.guard';
import { PicpayKeycloakService } from './picpay-keycloak.service';

export function keycloakInitializer(keycloak: PicpayKeycloakService) {
    return keycloak.initKeycloak.bind(keycloak);
}

@NgModule({
    imports: [CommonModule, KeycloakAngularModule],
})
export class PicpayKeycloakModule {
    static forRoot(config: PicpayKeycloakConfig): ModuleWithProviders<PicpayKeycloakModule> {
        return {
            ngModule: PicpayKeycloakModule,
            providers: [
                {
                    provide: PicpayKeycloakConfigService,
                    useValue: config,
                },
                {
                    provide: APP_INITIALIZER,
                    useFactory: keycloakInitializer,
                    multi: true,
                    deps: [PicpayKeycloakService],
                },
                KeycloakService,
                PicpayKeycloakService,
                PicpayKeycloakGuard,
            ],
        };
    }
}
