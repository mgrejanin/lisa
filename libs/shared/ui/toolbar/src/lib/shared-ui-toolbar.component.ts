import { Component, Input } from "@angular/core";
import { FormControl } from '@angular/forms';

@Component({
    selector:'lisa-shared-ui-toolbar',
    templateUrl: './shared-ui-toolbar.component.html',
    styleUrls: ['./shared-ui-toolbar.component.scss']
})
export class SharedUiToolbarComponent{
    @Input() title:string;

    search = new FormControl();
}