import { Component, OnInit } from '@angular/core';
import { StepService } from '../../data-access/step/step.service';

@Component({
    selector: 'seller-register-welcome-tips',
    templateUrl: './welcome-tips.component.html',
    styleUrls: ['./welcome-tips.component.scss'],
})
export class WelcomeTipsComponent implements OnInit {
    title = 'Dicas para o cadastro';

    constructor(private stepService: StepService) {}

    ngOnInit(): void {
        this.stepService.initStep({
            headerTitle: this.title,
            activateProgressbar: false,
        });
    }
}
