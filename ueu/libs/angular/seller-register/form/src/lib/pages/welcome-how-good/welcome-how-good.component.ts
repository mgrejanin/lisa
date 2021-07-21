import { Component, OnInit } from '@angular/core';
import { StepService } from '../../data-access/step/step.service';

@Component({
    selector: 'seller-register-welcome-how-good',
    templateUrl: './welcome-how-good.component.html',
    styleUrls: ['./welcome-how-good.component.scss'],
})
export class WelcomeHowGoodComponent implements OnInit {
    constructor(private stepService: StepService) {}

    ngOnInit(): void {
        this.stepService.initStep({
            activateProgressbar: false,
        });
    }
}
