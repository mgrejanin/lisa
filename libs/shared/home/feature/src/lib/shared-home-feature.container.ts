import { Component } from "@angular/core";

@Component({
    selector: 'lisa-shared-home-container',
    template: '<lisa-shared-ui-toolbar [title]="title"></lisa-shared-ui-toolbar>'
})
export class SharedHomeFeatureContainer{
    title = "Lisa";
}