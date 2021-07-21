import { APP_INITIALIZER, ModuleWithProviders, NgModule, NgZone } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

import * as d from '@picpay/lab-components-angular-components';

import { appInitialize } from './app-initialize';

const DECLARATIONS = [
    d.LabButton,
    d.LabCardButton,
    d.LabHeader,
    d.LabInput,
    d.LabMarkdown,
    d.LabSimpleHeader,
    d.LabTitle,
    d.LabTransformer,
];

@NgModule({
    imports: [CommonModule],
    declarations: DECLARATIONS,
    exports: DECLARATIONS,
})
export class LabComponentsAngularModule {
    static forRoot(): ModuleWithProviders<LabComponentsAngularModule> {
        return {
            ngModule: LabComponentsAngularModule,
            providers: [
                {
                    provide: APP_INITIALIZER,
                    useFactory: appInitialize,
                    multi: true,
                    deps: [DOCUMENT, NgZone],
                },
            ],
        };
    }
}
