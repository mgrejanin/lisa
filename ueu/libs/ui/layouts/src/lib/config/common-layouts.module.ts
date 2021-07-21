import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

// Data-access configuration interface & injection token
import { CommonLayoutsConfig, CommonLayoutsConfigService } from './common-layouts.config';

@NgModule({
    declarations: [],
    imports: [CommonModule],
})
export class CommonLayoutsModule {
    static forRoot(config: CommonLayoutsConfig): ModuleWithProviders<CommonLayoutsModule> {
        return {
            ngModule: CommonLayoutsModule,
            providers: [
                {
                    provide: CommonLayoutsConfigService,
                    useValue: config,
                },
            ],
        };
    }
}
