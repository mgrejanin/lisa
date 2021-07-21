import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LayoutDefaultComponent } from './layout-default.component';

// ng-mocks
import { MockComponents, MockModule, ngMocks } from 'ng-mocks';

// modules
import { MatSidenavModule } from '@angular/material/sidenav';
import {
    DashboardLogoOptions,
    MenuItemComponent,
    MenuItemParamsMock,
    MobileFixedMenuComponent,
    SideMenuComponent,
} from '@picpay/ui/components';

// state
import { MenuQuery, MenuService } from '../../state';

// mocks
import { By } from '@angular/platform-browser';
import { MenuQueryMock, MenuServiceMock } from '../../state/';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { PicpayIfRolesModule, PicpayIfRolesService, PicpayIfRolesServiceMock } from '@picpay/angular/shared/directives';
@Component({
    template: `
        <picpay-layout-default>
            <div slot="logo-wrap">PicPay Logo</div>
            <h1 slot="menu-wrap">PicPay Slot</h1>
        </picpay-layout-default>
    `,
})
class HostComponent {}

describe('LayoutDefaultComponent', () => {
    describe('Component test', () => {
        let component: LayoutDefaultComponent;
        let fixture: ComponentFixture<LayoutDefaultComponent>;
        let service: MenuService;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [RouterTestingModule, MockModule(MatSidenavModule)],
                declarations: [LayoutDefaultComponent, MockComponents(SideMenuComponent, MobileFixedMenuComponent)],
                providers: [
                    { provide: MenuQuery, useClass: MenuQueryMock },
                    { provide: MenuService, useClass: MenuServiceMock },
                ],
            }).compileComponents();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(LayoutDefaultComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            service = TestBed.inject(MenuService);
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should bind items$ to side menu component', () => {
            const sideMenu = fixture.debugElement.query(By.css('.c-default-layout__side-menu')).componentInstance;

            expect(sideMenu.items).toEqual([MenuItemParamsMock]);
        });

        it('should bind isOpen$ to side menu component', () => {
            const sideMenu = fixture.debugElement.query(By.css('.c-default-layout__side-menu')).componentInstance;

            expect(sideMenu.isOpen).toEqual(true);
        });

        it('should bind keepOpen$ to side menu component', () => {
            const sideMenu = fixture.debugElement.query(By.css('.c-default-layout__side-menu')).componentInstance;

            expect(sideMenu.keepOpen).toEqual(true);
        });

        it('should bind logo$ to side menu component', () => {
            const sideMenu = fixture.debugElement.query(By.css('.c-default-layout__side-menu')).componentInstance;

            expect(sideMenu.logo).toEqual(DashboardLogoOptions.FEATURE_FLAG);
        });

        it('should bind title$ to side menu component', () => {
            const sideMenu = fixture.debugElement.query(By.css('.c-default-layout__side-menu')).componentInstance;

            expect(sideMenu.title).toEqual('mockTitle');
        });

        it('should bind the toggleIsMenuOpen event of side menu component to toggleIsMenuOpen', () => {
            const sideMenu = fixture.debugElement.query(By.css('.c-default-layout__side-menu')).componentInstance;

            const toggleisMenuOpenSpy = spyOn(component, 'toggleIsMenuOpen');

            sideMenu.toggleIsMenuOpen.emit(true);

            expect(toggleisMenuOpenSpy).toHaveBeenCalledWith(true);

            toggleisMenuOpenSpy.calls.reset();

            sideMenu.toggleIsMenuOpen.emit(false);

            expect(toggleisMenuOpenSpy).toHaveBeenCalledWith(false);
        });

        it('should bind the toggleKeepMenuOpen event of side menu component to toggleKeepMenuOpen', () => {
            const sideMenu = fixture.debugElement.query(By.css('.c-default-layout__side-menu')).componentInstance;

            const toggleKeepMenuOpenSpy = spyOn(component, 'toggleKeepMenuOpen');

            sideMenu.toggleKeepMenuOpen.emit(true);

            expect(toggleKeepMenuOpenSpy).toHaveBeenCalledWith(true);

            toggleKeepMenuOpenSpy.calls.reset();

            sideMenu.toggleKeepMenuOpen.emit(false);

            expect(toggleKeepMenuOpenSpy).toHaveBeenCalledWith(false);
        });

        it('should bind mobileItems$ to mobile menu component', () => {
            const sideMenu = fixture.debugElement.query(By.css('.c-default-layout__mobile-menu')).componentInstance;

            expect(sideMenu.items).toEqual([MenuItemParamsMock]);
        });

        it('should have a toggleIsMenuOpen method', () => {
            const menuServiceSpy = spyOn(service, 'setIsMenuOpen');
            component.toggleIsMenuOpen(true);

            expect(menuServiceSpy).toHaveBeenCalledWith(true);
        });

        it('should have a toggleKeepMenuOpen method', () => {
            const menuServiceSpy = spyOn(service, 'setKeepMenuOpen');
            component.toggleKeepMenuOpen(true);

            expect(menuServiceSpy).toHaveBeenCalledWith(true);
        });
    });

    describe('Slot test', () => {
        let fixture: ComponentFixture<HostComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                declarations: [
                    HostComponent,
                    LayoutDefaultComponent,
                    SideMenuComponent,
                    MockComponents(MatIcon, MatTooltip, MenuItemComponent, MobileFixedMenuComponent),
                ],
                imports: [RouterTestingModule, PicpayIfRolesModule, MockModule(MatSidenavModule)],
                providers: [
                    { provide: MenuQuery, useClass: MenuQueryMock },
                    { provide: MenuService, useClass: MenuServiceMock },
                    { provide: PicpayIfRolesService, useValue: new PicpayIfRolesServiceMock(['test']) },
                ],
            }).compileComponents();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(HostComponent);
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(fixture).toBeTruthy();
        });

        it('should render menu wrap content', () => {
            const slot = ngMocks.find('[slot=menu-wrap]');
            expect(slot.nativeElement.innerHTML).toContain('PicPay Slot');
        });

        it('should render logo wrap content', () => {
            const slot = ngMocks.find('[slot="logo-wrap"]');
            expect(slot.nativeElement.innerHTML).toContain('PicPay Logo');
        });
    });
});
