import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'picpay-user-dropdown',
    templateUrl: './user-dropdown.component.html',
    styleUrls: ['./user-dropdown.component.scss'],
})
export class UserDropdownComponent implements OnInit {
    @Input() username: string;
    @Input() accountChange: boolean;
    @Input() userImage: string;
    @Output() changeProfile = new EventEmitter();

    private readonly DEFAULT_AVATAR = '/assets/ui/header/profile_default.svg';

    ngOnInit(): void {
        this.userImage = this.userImage ? this.userImage : this.DEFAULT_AVATAR;
    }

    changeCurrentProfile() {
        this.changeProfile.emit();
    }
}
