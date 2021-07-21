import { Component } from '@angular/core';

@Component({
    selector: 'ops-dash-first-access',
    templateUrl: './first-access.component.html',
    styleUrls: ['./first-access.component.scss'],
})
export class FirstAccessComponent {
    goToConfluence(): void {
        window.open('https://picpay.atlassian.net/wiki/spaces/PENG/pages/2093679655/Primeiro+acesso', '_blank');
    }
}
