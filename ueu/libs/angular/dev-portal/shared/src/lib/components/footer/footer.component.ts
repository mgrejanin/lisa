import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { EventTracking } from '@picpay/event-tracking';

import { Product } from '../../models';
import { ProductsQuery } from '../../data-access/products/products.query';
import { UiQuery } from '../../data-access/ui/ui.query';

@Component({
    selector: 'dev-portal-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
    readonly products$: Observable<Product[]>;
    readonly isMobile$: Observable<boolean>;
    readonly isLoading$: Observable<boolean>;
    private currentSlug: string;
    menu = [
        {
            id: 'btn_footer_home',
            name: 'Home',
            url: '/',
        },
        {
            id: 'btn_footer_politica_privacidade',
            name: 'Política de Privacidade',
            url: 'https://picpay.com/site/privacidade',
            external: true,
        },
        {
            id: 'btn_footer_faq',
            name: 'Central de Ajuda',
            url: 'https://ajudaempresas.picpay.com/hc/pt-br/categories/360004972752-PicPay-Studio-',
            external: true,
        },
        {
            id: 'btn_footer_download_picpay',
            name: 'Download PicPay Empresas',
            url: 'https://www.picpay.com/site/download',
            external: true,
        },
        {
            id: 'btn_footer_site_picpay',
            name: 'PicPay.com',
            url: 'http://picpay.com.br',
            external: true,
        },
    ];

    toggleMobile = {
        institucional: false,
        produtos: false,
    };

    constructor(private query: ProductsQuery, private uiQuery: UiQuery, private route: ActivatedRoute) {
        this.products$ = this.query.products$;
        this.isMobile$ = this.uiQuery.isMobile$;
        this.isLoading$ = this.query.selectLoading();
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.currentSlug = params.slug;
        });
    }

    eventTracking(button_name?: string, context?: string) {
        const ctx = context.toLocaleUpperCase();
        const btn_name = button_name.toLocaleUpperCase();
        const page_name = this.currentSlug ? `_${this.currentSlug.toLocaleUpperCase()}` : ``;
        EventTracking.track('Button Clicked', {
            button_name: `BOTAO_${btn_name}_${ctx}`,
            page_name: `STUDIO_PICPAY${page_name}`,
            context: ctx,
        });
    }
}
