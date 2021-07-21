import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SellerUser } from '@picpay/seller-panel/helpers';
import { SellerQuery } from '@picpay/seller-panel/services';

@Component({
    selector: 'seller-panel-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
    navLinks = [
        {
            path: 'meus-dados',
            label: 'Meus Dados',
        },
        {
            path: 'alterar-senha',
            label: 'Alterar Senha',
        },
        {
            path: 'saques-bancarios',
            label: 'Saques bancários',
        },
    ];

    constructor(private router: Router, private sellerQuery: SellerQuery) {}

    ngOnInit(): void {
        this.myPlanRouteResolver();
    }

    async backToPreviousPage() {
        await this.router.navigate(['/']);
    }

    private myPlanRouteResolver() {
        if (this.sellerQuery.getValue().organization?.type === SellerUser.ECOMMERCE) {
            this.navLinks.push({
                path: 'meu-plano',
                label: 'Meu Plano',
            });
        } else {
            this.navLinks = this.navLinks.filter(link => link.path !== 'meu-plano');
        }
    }
}
