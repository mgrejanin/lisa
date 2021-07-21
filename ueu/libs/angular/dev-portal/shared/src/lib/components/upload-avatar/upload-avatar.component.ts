import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CropperSettings, ICropperSettings, ImageCropperComponent } from 'ngx-img-cropper';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'dev-portal-upload-avatar',
    templateUrl: './upload-avatar.component.html',
    styleUrls: ['./upload-avatar.component.scss'],
})
export class UploadAvatarComponent implements OnInit {
    @ViewChild('uploadImage') uploadImage: ElementRef<HTMLElement>;
    @ViewChild('cropper', { static: true }) cropper: ImageCropperComponent;
    @ViewChild('wrapper', { static: true }) wrapper: ElementRef;
    cropperSettings: ICropperSettings;
    newAvatar: unknown;
    input;

    protected gallery$ = new BehaviorSubject(true);
    gallery = this.gallery$.asObservable();

    avatars = [
        { src: './assets/icons/avatar/avatar-1.svg' },
        { src: './assets/icons/avatar/avatar-2.svg' },
        { src: './assets/icons/avatar/avatar-3.svg' },
        { src: './assets/icons/avatar/avatar-4.svg' },
        { src: './assets/icons/avatar/avatar-5.svg' },
    ];

    constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<UploadAvatarComponent>) {
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.noFileInput = true;

        this.cropperSettings.width = 217;
        this.cropperSettings.height = 217;

        this.cropperSettings.canvasWidth = 217;
        this.cropperSettings.canvasHeight = 217;

        this.cropperSettings.croppedWidth = 400;
        this.cropperSettings.croppedHeight = 400;

        this.cropperSettings.minWidth = 0;
        this.cropperSettings.minHeight = 0;

        this.cropperSettings.keepAspect = true;
        this.cropperSettings.rounded = true;

        this.cropperSettings.cropperDrawSettings.dynamicSizing = true;

        this.cropperSettings.cropperDrawSettings.strokeWidth = 2;

        this.newAvatar = {};
    }

    ngOnInit() {
        if (this.data.image) {
            this.data.image.value
                ? this.setCropperWithImage(this.data.image.value)
                : this.convertImagetoBase64(this.avatars[0].src, this);
        }
    }

    handleUploadImage() {
        const el: HTMLElement = this.uploadImage.nativeElement;
        el.click();
    }

    uploadImageChange(event): void {
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            this.setCropperWithImage(file);
        }
    }

    currentSlideEvent(item): void {
        this.convertImagetoBase64(item.src, this);
    }

    updateGallery(value: boolean): void {
        this.gallery$.next(value);
    }

    convertImagetoBase64(imgUrl, self): void {
        const xhr = new XMLHttpRequest();
        xhr.open('get', imgUrl, true);
        // Essential
        xhr.responseType = 'blob';
        xhr.onload = function () {
            if (this.status === 200) {
                const blob = this.response;
                self.setCropperWithImage(blob);
            }
        };
        xhr.send();
    }

    setCropperWithImage(file): void {
        const image: HTMLImageElement = new Image();
        const myReader: FileReader = new FileReader();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        myReader.addEventListener('loadend', (loadEvent: any) => {
            image.addEventListener('load', () => {
                this.cropper.setImage(image);
            });
            image.src = loadEvent.target.result;
        });

        myReader.readAsDataURL(file);
    }

    saveImage(): void {
        this.dialogRef.close(this.newAvatar);
    }
}
