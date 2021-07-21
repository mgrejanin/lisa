import { ComponentFixture, TestBed } from '@angular/core/testing';

// components
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { SideMenuComponent } from './side-menu.component';

// ng-mocks
import { By } from '@angular/platform-browser';
import { MockComponents, MockedComponent, ngMocks } from 'ng-mocks';

// interfaces
import { DashboardLogoOptions, MenuItemParams, SubmenuItemParams } from '../../interfaces';

// modules
import { RouterTestingModule } from '@angular/router/testing';
import { PicpayIfRolesModule, PicpayIfRolesService, PicpayIfRolesServiceMock } from '@picpay/angular/shared/directives';
import { Component } from '@angular/core';

@Component({
    template: `
        <picpay-side-menu>
            <div slot="logo-wrap">PicPay Logo</div>
            <h1 slot="side-menu-wrap">PicPay Slot</h1>
        </picpay-side-menu>
    `,
})
class HostComponent {}

describe('SideMenuComponent', () => {
    describe('Component test', () => {
        let component: SideMenuComponent;
        let fixture: ComponentFixture<SideMenuComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                declarations: [SideMenuComponent, MockComponents(MatIcon, MatTooltip, MenuItemComponent)],
                imports: [PicpayIfRolesModule, RouterTestingModule],
                providers: [{ provide: PicpayIfRolesService, useValue: new PicpayIfRolesServiceMock(['test']) }],
            }).compileComponents();
        });

        beforeEach(() => {
            fixture = TestBed.createComponent(SideMenuComponent);
            component = fixture.componentInstance;

            component.logo = DashboardLogoOptions.FEATURE_FLAG;
            component.title = 'testTitle';
            component.items = [
                new MenuItemParams('testIcon', 'testText', 'testActiveUrl'),
                new MenuItemParams('testIcon', 'testText', 'testRoute', [
                    new SubmenuItemParams('testText', 'testRoute'),
                ]),
            ];
            component.isOpen = true;
            component.keepOpen = true;

            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should have onToggleKeepMenuOpen function', () => {
            const emitterSpy = spyOn(component.toggleKeepMenuOpen, 'emit');

            component.onToggleKeepMenuOpen(true);
            expect(emitterSpy).toHaveBeenCalledWith(true);

            emitterSpy.calls.reset();

            component.onToggleKeepMenuOpen(false);
            expect(emitterSpy).toHaveBeenCalledWith(false);
        });

        it('should have onToggleMenuIsOpen function', () => {
            const emitterSpy = spyOn(component.toggleIsMenuOpen, 'emit');

            component.onToggleIsMenuOpen(true);
            expect(emitterSpy).toHaveBeenCalledWith(true);

            emitterSpy.calls.reset();

            component.onToggleIsMenuOpen(false);
            expect(emitterSpy).toHaveBeenCalledWith(false);
        });

        it('should bind the  mouseover and mouseleave events of the content wrapper to onToggleIsOpen', () => {
            const content = fixture.debugElement.query(By.css('.c-side-menu'));

            const toggleSpy = spyOn(component, 'onToggleIsMenuOpen');

            content.triggerEventHandler('mouseover', {});
            expect(toggleSpy).toHaveBeenCalledWith(true);

            toggleSpy.calls.reset();

            content.triggerEventHandler('mouseleave', {});

            expect(toggleSpy).toHaveBeenCalledWith(false);
        });

        it('should have collapsed class if isOpen = false', () => {
            let sideMenu = fixture.debugElement.query(By.css('.c-side-menu'));

            expect(component.isOpen).toBe(true);
            expect(sideMenu.classes.collapsed).toBeFalsy();

            component.isOpen = false;
            fixture.detectChanges();
            sideMenu = fixture.debugElement.query(By.css('.c-side-menu'));

            expect(sideMenu.classes.collapsed).toBe(true);
        });

        it('should display menu items', () => {
            const menuItems = fixture.debugElement.queryAll(By.css('.c-side-menu__menu-item'));

            expect(menuItems.length).toEqual(component.items.length);

            const firstMenuItem = menuItems[0].componentInstance as MockedComponent<MenuItemComponent>;

            expect(firstMenuItem.params).toEqual(component.items[0]);
            expect(firstMenuItem.isCollapsed).toBe(false);

            const secondMenuItem = menuItems[1].componentInstance as MockedComponent<MenuItemComponent>;

            expect(secondMenuItem.params).toEqual(component.items[1]);
            expect(secondMenuItem.isCollapsed).toBe(false);
        });

        it('should have a keep open button', () => {
            const button = fixture.debugElement.query(By.css('.c-side-menu__lock-button'));
            const toggleSpy = spyOn(component, 'onToggleKeepMenuOpen');

            expect(button).not.toBeNull();

            button.nativeElement.click();
            expect(toggleSpy).toHaveBeenCalledWith(!component.keepOpen);

            // testing icon
            // keepOpen = true
            let icon = button.query(By.css('mat-icon'));
            expect(icon.nativeElement.textContent.trim()).toBe('keyboard_arrow_left');

            // keepOpen = false
            component.keepOpen = false;
            fixture.detectChanges();
            fixture.debugElement.query(By.css('.c-side-menu__lock-button'));
            icon = button.query(By.css('mat-icon'));

            expect(icon.nativeElement.textContent.trim()).toBe('keyboard_arrow_right');
        });

        xit('should prevent event propagation on mouse over in lock button', () => {
            const sideMenu = fixture.debugElement.query(By.css('.c-side-menu'));
            const button = fixture.debugElement.query(By.css('.c-side-menu__lock-button'));

            button.nativeElement.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

            expect(sideMenu.classes.collapsed).toBe(false);
        });
    });

    describe('Slot test', () => {
        let fixture: ComponentFixture<HostComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                declarations: [
                    HostComponent,
                    SideMenuComponent,
                    MockComponents(MatIcon, MatTooltip, MenuItemComponent),
                ],
                imports: [PicpayIfRolesModule, RouterTestingModule],
                providers: [{ provide: PicpayIfRolesService, useValue: new PicpayIfRolesServiceMock(['test']) }],
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
            const slot = ngMocks.find('[slot="side-menu-wrap"]');
            expect(slot.nativeElement.innerHTML).toContain('PicPay Slot');
        });

        it('should render logo wrap content', () => {
            const slot = ngMocks.find('[slot="logo-wrap"]');
            expect(slot.nativeElement.innerHTML).toContain('PicPay Logo');
        });
    });
});
