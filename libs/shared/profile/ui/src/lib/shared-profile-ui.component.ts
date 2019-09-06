import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'lisa-shared-profile-ui-component',
  templateUrl: './shared-profile-ui.component.html',
  styleUrls: ['./shared-profile-ui.component.scss']
})
export class SharedProfileUiComponent{
  @Output() doLoginAction = new EventEmitter();
}
