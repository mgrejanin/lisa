import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ChangeImageProfile } from '../../models/change-image-profile.model';
import { ModalCropComponent } from '../modal-crop/modal-crop.component';

@Component({
    selector: 'seller-panel-change-image-profile',
    templateUrl: './change-image-profile.component.html',
    styleUrls: ['./change-image-profile.component.scss'],
})
export class ChangeImageProfileComponent implements OnInit {
    avatarUrl: string;
    DEFAULT_AVATAR = 'assets/placeholders/consumer.png';

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: ChangeImageProfile,
        private matDialog: MatDialog,
        private dialogRef: MatDialogRef<ChangeImageProfileComponent>,
    ) {}

    ngOnInit(): void {
        this.setImageProfilePreview(this.data.image);
    }

    setImageProfilePreview(image: string) {
        this.avatarUrl = image ? image : this.DEFAULT_AVATAR;
    }

    onChangeImageProfile(fileList) {
        const file = fileList[0];

        if (file) {
            this.openCropModal(file);
        }
    }

    onCloseChangeImageModal(): void {
        this.dialogRef.close();
    }

    onApplyNewImageProfile(): void {
        this.dialogRef.close({ image: this.data.image });
    }

    private openCropModal(file): void {
        const cropperDialog = this.matDialog.open(ModalCropComponent, {
            panelClass: ['max-height-80', 'o-modal-reset'],
            height: '480px',
            width: '542px',
            data: { file },
        });

        cropperDialog.afterClosed().subscribe(data => {
            if ((data || {}).image) {
                this.data.image = data.image;
                this.setImageProfilePreview(this.data.image);
            }
        });
    }
}
