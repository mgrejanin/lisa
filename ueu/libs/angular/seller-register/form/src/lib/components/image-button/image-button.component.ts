import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'seller-register-image-button',
    templateUrl: './image-button.component.html',
    styleUrls: ['./image-button.component.scss'],
})
export class ImageButtonComponent {
    readonly DEFAULT_IMAGE = 'assets/seller-register/icons/store.svg';
    imageSource: string | ArrayBuffer;
    enableEdit: boolean;

    @Output() selectedImageEvent: EventEmitter<File>;
    @Output() errorEvent: EventEmitter<string>;

    constructor() {
        this.imageSource = this.DEFAULT_IMAGE;
        this.enableEdit = false;

        this.selectedImageEvent = new EventEmitter();
        this.errorEvent = new EventEmitter();
    }

    handleImageUpload(file: File) {
        if (file) {
            this.validateImageSize(file);
        } else {
            this.errorEvent.emit('Erro no upload da imagem');
        }
    }

    validateImageSize(file: File) {
        const bytesToMb = (bytes: number) => parseFloat((bytes / (1024 * 1024)).toFixed(2));
        const imageSize = bytesToMb(file.size);

        if (imageSize > 1) {
            this.errorEvent.emit('Imagem deve ter tamanho máximo de 1MB');
        } else {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                this.imageSource = reader.result;
                this.enableEdit = true;
                this.sendSelectedImage(file);
            };
        }
    }

    sendSelectedImage(imageFile: File) {
        this.selectedImageEvent.emit(imageFile);
    }
}
