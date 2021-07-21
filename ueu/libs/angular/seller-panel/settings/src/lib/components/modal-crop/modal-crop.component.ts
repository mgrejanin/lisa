import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CropperSettings, ImageCropperComponent } from 'ngx-img-cropper';
@Component({
    selector: 'seller-panel-modal-crop',
    templateUrl: './modal-crop.component.html',
    styleUrls: ['./modal-crop.component.scss'],
})
export class ModalCropComponent implements OnInit {
    @ViewChild('cropper', { static: true }) cropper: ImageCropperComponent;
    @ViewChild('wrapper', { static: true }) wrapper: ElementRef;
    cropperSettings: CropperSettings;
    imageData: { image?: HTMLImageElement };

    constructor(
        public dialogRef: MatDialogRef<ModalCropComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { file: File },
    ) {
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.noFileInput = true;

        this.cropperSettings.width = 300;
        this.cropperSettings.height = 300;

        this.cropperSettings.croppedWidth = 400;
        this.cropperSettings.croppedHeight = 400;

        this.cropperSettings.minWidth = 0;
        this.cropperSettings.minHeight = 0;

        this.cropperSettings.keepAspect = true;

        this.cropperSettings.cropperDrawSettings.strokeWidth = 2;

        this.imageData = {};
    }

    ngOnInit() {
        const nativeEl = this.wrapper.nativeElement;
        this.cropperSettings.canvasWidth = nativeEl.clientWidth;
        this.cropperSettings.canvasHeight = nativeEl.clientHeight;

        this.setImage(this.data.file);
    }

    setImage(file): void {
        const image = new Image();
        const myReader: FileReader = new FileReader();

        myReader.addEventListener('loadend', () => {
            const imageAvatar: string = myReader.result as string;

            image.addEventListener('load', () => {
                this.cropper.setImage(image);
            });
            image.src = imageAvatar;
        });

        myReader.readAsDataURL(file);
    }

    saveImage(): void {
        this.dialogRef.close({ image: this.imageData.image });
    }
}
