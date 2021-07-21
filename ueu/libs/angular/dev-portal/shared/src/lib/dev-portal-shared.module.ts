import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { ImageCropperModule } from 'ngx-img-cropper';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { CoreDataAccessConfigService } from '@picpay/angular/shared/core/data-access';
import { UiComponentsModule } from '@picpay/ui/components';

import {
    DevPortalDataAccessConfig,
    DevPortalDataAccessConfigService,
} from './data-access/dev-portal-data-access.config';

import { BannerComponent } from './components/banner/banner.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CodeSnippetComponent } from './components/code-snippet/code-snippet.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { NoticeComponent } from './components/notice/notice.component';
import { UploadAvatarComponent } from './components/upload-avatar/upload-avatar.component';
import { ErrorContainerComponent } from './components/error-container/error-container.component';

const MaterialComponents = [MatDialogModule];
const imports = [
    BannerComponent,
    CarouselComponent,
    CodeSnippetComponent,
    ContactFormComponent,
    FooterComponent,
    HeaderComponent,
    LogoComponent,
    NoticeComponent,
    UploadAvatarComponent,
    ErrorContainerComponent,
];
@NgModule({
    declarations: [...imports],
    exports: [...imports, ...MaterialComponents],
    imports: [
        CommonModule,
        RouterModule,
        DesignSystemAngularModule,
        ReactiveFormsModule,
        ClipboardModule,
        HighlightModule,
        ImageCropperModule,
        UiComponentsModule,
        ...MaterialComponents,
    ],
    entryComponents: [ContactFormComponent, LogoComponent],
})
export class DevPortalSharedModule {
    static forRoot(config: DevPortalDataAccessConfig): ModuleWithProviders<DevPortalSharedModule> {
        return {
            ngModule: DevPortalSharedModule,
            providers: [
                { provide: CoreDataAccessConfigService, useValue: config },
                {
                    provide: DevPortalDataAccessConfigService,
                    useValue: config,
                },
                {
                    provide: HIGHLIGHT_OPTIONS,
                    useValue: {
                        fullLibraryLoader: () => import('highlight.js'),
                        lineNumbersLoader: () => import('highlightjs-line-numbers.js'),
                    },
                },
            ],
        };
    }
}
