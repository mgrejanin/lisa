import { Component, Input } from "@angular/core";

@Component({
    selector:'lisa-shared-ui-toolbar',
    templateUrl: './shared-ui-toolbar.component.html',
    styleUrls: ['./shared-ui-toolbar.component.scss']
})
export class SharedUiToolbarComponent{
    @Input() title:string;
}