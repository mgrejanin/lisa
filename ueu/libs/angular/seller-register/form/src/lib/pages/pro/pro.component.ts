import { Component, OnInit } from '@angular/core';

import { StepService } from '../../data-access/step/step.service';

@Component({
    selector: 'seller-register-pro',
    templateUrl: './pro.component.html',
    styleUrls: ['./pro.component.scss'],
})
export class ProComponent implements OnInit {
    title: string;

    appUrl: string;
    androidApp: string;
    iosApp: string;

    constructor(private stepService: StepService) {
        this.title = 'PicPay Pro';
        this.androidApp = 'https://play.google.com/store/apps/details?id=com.picpay';
        this.iosApp = 'https://itunes.apple.com/br/app/id561524792';
    }

    ngOnInit() {
        this.stepService.initStep({
            headerTitle: this.title,
            activateProgressbar: false,
        });

        this.defineUrl();
    }

    defineUrl() {
        const userAgent = navigator.userAgent;

        if (/android/i.test(userAgent)) {
            this.appUrl = this.androidApp;
        } else if (/iPad|iPhone|iPod/.test(userAgent)) {
            this.appUrl = this.iosApp;
        }
    }
}
