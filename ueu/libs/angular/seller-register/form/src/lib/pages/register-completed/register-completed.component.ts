import { Component, OnInit } from '@angular/core';

import { StepService } from '../../data-access/step/step.service';

@Component({
    selector: 'seller-register-register-completed',
    templateUrl: './register-completed.component.html',
    styleUrls: ['./register-completed.component.scss'],
})
export class RegisterCompletedComponent implements OnInit {
    title: string;

    constructor(private stepService: StepService) {
        this.title = 'Cadastro concluído';
    }

    ngOnInit(): void {
        this.stepService.initStep({
            headerTitle: this.title,
            valueProgressBar: 10,
        });
    }
}
