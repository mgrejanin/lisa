import { Component, OnInit } from '@angular/core';

import { StepService } from '../../data-access/step/step.service';

@Component({
    selector: 'seller-register-additional-information',
    templateUrl: './additional-information.component.html',
    styleUrls: ['./additional-information.component.scss'],
})
export class AdditionalInformationComponent implements OnInit {
    title: string;

    constructor(private stepService: StepService) {
        this.title = 'Configurações adicionais';
    }

    ngOnInit(): void {
        this.stepService.initStep({
            headerTitle: this.title,
            valueProgressBar: 0,
        });
    }
}
