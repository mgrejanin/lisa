import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CropperSettings, ImageCropperComponent } from 'ngx-img-cropper';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';

import { CarouselComponent } from '../carousel/carousel.component';
import { UploadAvatarComponent } from './upload-avatar.component';

require('jest-canvas-mock');

describe('UploadAvatarComponent', () => {
    let component: UploadAvatarComponent;
    let fixture: ComponentFixture<UploadAvatarComponent>;
    const MatDialogRefStub = () => ({ close: () => ({}) });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UploadAvatarComponent, CarouselComponent, ImageCropperComponent],
            imports: [DesignSystemAngularModule, BrowserAnimationsModule],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: {}, useFactory: MatDialogRefStub },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UploadAvatarComponent);
        component = fixture.componentInstance;
        component.newAvatar = {};
        component.cropperSettings = new CropperSettings();
        component.cropperSettings.noFileInput = true;
        component.cropperSettings.width = 217;
        component.cropperSettings.height = 217;
        component.cropperSettings.canvasWidth = 217;
        component.cropperSettings.canvasHeight = 217;
        component.cropperSettings.croppedWidth = 400;
        component.cropperSettings.croppedHeight = 400;
        component.cropperSettings.minWidth = 0;
        component.cropperSettings.minHeight = 0;
        component.cropperSettings.keepAspect = true;
        component.cropperSettings.rounded = true;
        component.cropperSettings.cropperDrawSettings.dynamicSizing = true;
        component.cropperSettings.cropperDrawSettings.strokeWidth = 2;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
