import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CoreDataAccessConfig, CoreDataAccessConfigService } from './core-data-access.config';

@NgModule({
    declarations: [],
    imports: [CommonModule],
})
export class CoreDataAccessModule {
    static forRoot(config: CoreDataAccessConfig): ModuleWithProviders<CoreDataAccessModule> {
        return {
            ngModule: CoreDataAccessModule,
            providers: [
                {
                    provide: CoreDataAccessConfigService,
                    useValue: config,
                },
            ],
        };
    }
}
