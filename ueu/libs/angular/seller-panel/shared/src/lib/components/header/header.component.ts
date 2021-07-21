import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { SellerUser } from '@picpay/seller-panel/helpers';
import { ChangePanelService, Organization, SellerQuery, EventTrackingService } from '@picpay/seller-panel/services';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ChangeProfileComponent } from '../change-profile/change-profile.component';
import { DynamicModal } from '../../models/dynamic-modal.model';
import { ModalDynamicComponent } from '../modals/dynamic/dynamic.component';
import { Router } from '@angular/router';

@Component({
    selector: 'seller-panel-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
    @Input() showLogoInDesktop: boolean;
    @Output() logout: EventEmitter<void>;

    dynamicModalData: DynamicModal;

    readonly organizationData$: Observable<Organization>;
    readonly isShowLogoInDesktop$: Observable<boolean>;
    readonly hasBranch$: Observable<boolean>;

    isMobile$: Observable<boolean>;
    unsubscribe$: Subject<void>;

    readonly FAQ_URL: SafeUrl;
    readonly TYPE_ECOMMERCE: SellerUser;

    constructor(
        private breakpointObserver: BreakpointObserver,
        private sanitizer: DomSanitizer,
        private matDialog: MatDialog,
        private sellerQuery: SellerQuery,
        private changePanelService: ChangePanelService,
        private router: Router,
        private eventTracking: EventTrackingService,
    ) {
        this.logout = new EventEmitter();
        this.unsubscribe$ = new Subject();

        this.FAQ_URL = this.sanitizer.bypassSecurityTrustUrl(
            'https://ajudaempresas.picpay.com/hc/pt-br?utm_source=site_empresas&utm_medium=faq',
        );
        this.TYPE_ECOMMERCE = SellerUser.ECOMMERCE;

        this.isMobile$ = this.breakpointObserver.observe('(max-width: 768px)').pipe(map(result => result.matches));
        this.isShowLogoInDesktop$ = this.breakpointObserver
            .observe('(max-width: 768px)')
            .pipe(map(result => (this.showLogoInDesktop ? this.showLogoInDesktop : result.matches)));

        this.hasBranch$ = this.sellerQuery.hasBranch$;
        this.organizationData$ = this.sellerQuery.organization$;

        this.dynamicModalData = {
            title: 'Trocar perfil',
            component: ChangeProfileComponent,
            actions: { visible: false },
        };
    }

    onLogout(): void {
        this.logout.emit();
        this.eventTrackingClicked('SAIR');
    }

    onChangeProfile(): void {
        this.matDialog.open(ModalDynamicComponent, {
            width: '560px',
            panelClass: ['o-modal'],
            data: this.dynamicModalData,
        });
    }

    eventTrackingClicked(button_name: string): void {
        const url = this.router.url.substring(1);
        this.eventTracking.eventTrackingUserCliked(button_name, url, window, document);
    }

    getForeignPanelLink(): string {
        return this.changePanelService.getForeignPanelUrl();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
