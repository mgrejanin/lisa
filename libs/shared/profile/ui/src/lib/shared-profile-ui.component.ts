import { Component, EventEmitter, Input, Output } from '@angular/core';
import { auth } from 'firebase/app';

@Component({
  selector: 'lisa-shared-profile-ui-component',
  templateUrl: './shared-profile-ui.component.html',
  styleUrls: ['./shared-profile-ui.component.scss']
})
export class SharedProfileUiComponent {
  @Input() credential: auth.UserCredential;
  @Output() doLoginAction = new EventEmitter();
}
