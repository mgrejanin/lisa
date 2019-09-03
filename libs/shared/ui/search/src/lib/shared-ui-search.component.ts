import { Component } from "@angular/core";
import { FormControl } from '@angular/forms';

@Component({
  selector: 'lisa-shared-ui-search-component',
  templateUrl: './shared-ui-search.component.html',
  styleUrls:['./shared-ui-search.component.scss']
})
export class SharedUiSearchComponent{
  stateCtrl = new FormControl();
}
