import { Component, Input, OnChanges } from "@angular/core";

@Component({
    selector: 'lisa-shared-ui-sidenav',
    templateUrl: './shared-ui-sidenav.component.html',
    styleUrls: ['./shared-ui-sidenav.component.scss']
})
export class SharedUiSidenavComponent implements OnChanges{
    @Input() toogleSidenav:boolean;

    ngOnChanges(sidenav){
    }
}