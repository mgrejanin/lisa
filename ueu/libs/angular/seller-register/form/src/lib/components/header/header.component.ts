import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { StepQuery } from '../../data-access/step/step.query';

@Component({
    selector: 'seller-register-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    headerTitle: string;
    valueProgressBar: number;
    activateProgressbar = true;

    constructor(private location: Location, private stepQuery: StepQuery) {
        this.stepQuery.stepState$.subscribe(step => {
            const { headerTitle, activateProgressbar, valueProgressBar } = step;

            this.headerTitle = headerTitle;
            this.activateProgressbar = activateProgressbar;
            this.valueProgressBar = valueProgressBar;
        });
    }

    goBack(): void {
        this.location.back();
    }
}
