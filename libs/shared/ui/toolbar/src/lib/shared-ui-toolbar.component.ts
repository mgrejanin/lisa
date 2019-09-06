import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormControl } from '@angular/forms';

@Component({
    selector:'lisa-shared-ui-toolbar-component',
    templateUrl: './shared-ui-toolbar.component.html',
    styleUrls: ['./shared-ui-toolbar.component.scss']
})
export class SharedUiToolbarComponent{
    @Input() title:string;

    @Output() navigateToAction = new EventEmitter<string>();

    search = new FormControl();
}
