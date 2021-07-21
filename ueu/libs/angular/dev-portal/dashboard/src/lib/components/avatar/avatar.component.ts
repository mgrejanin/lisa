import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { subscribeUntil } from '@picpay/angular/shared/helpers';
import { initials, UploadAvatarComponent } from '@picpay/dev-portal/shared';

@Component({
    selector: 'dev-portal-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
    @Input() image: string | Blob;
    @Input() name: string;
    @Input() creating = false;
    @Output() getAvatar = new EventEmitter<string | Blob>();
    getInitials = initials;

    constructor(private dialog: MatDialog) {}

    changeAvatar(): void {
        this.dialog
            .open(UploadAvatarComponent, {
                maxWidth: '100vw',
                maxHeight: '100vh',
                panelClass: 'modal-control',
                data: { image: this.image },
            })
            .afterClosed()
            .pipe(subscribeUntil(this))
            .subscribe(result => {
                if (result?.image) {
                    this.image = result.image;
                    this.getAvatar.emit(result.image);
                }
            });
    }
}
