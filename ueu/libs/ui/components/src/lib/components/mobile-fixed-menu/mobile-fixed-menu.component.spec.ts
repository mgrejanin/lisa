import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

// components
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MobileFixedMenuComponent } from './mobile-fixed-menu.component';

// mocks
import { DummyComponent } from '../../mocks/dummy.component.mock';
import { MenuItemParamsMock } from '../../mocks';

// ng-mocks
import { MockComponent } from 'ng-mocks';

// roles
import { PicpayIfRolesModule, PicpayIfRolesService, PicpayIfRolesServiceMock } from '@picpay/angular/shared/directives';

describe('MobileFixedMenuComponent', () => {
    let component: MobileFixedMenuComponent;
    let fixture: ComponentFixture<MobileFixedMenuComponent>;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DummyComponent, MobileFixedMenuComponent, MockComponent(MatIcon)],
            imports: [
                PicpayIfRolesModule,
                RouterTestingModule.withRoutes([{ path: 'testRoute', component: DummyComponent }]),
            ],
            providers: [{ provide: PicpayIfRolesService, useValue: new PicpayIfRolesServiceMock(['test']) }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MobileFixedMenuComponent);
        component = fixture.componentInstance;

        router = TestBed.inject(Router);

        fixture.ngZone.run(() => {
            router.initialNavigation();
        });

        component.items = [MenuItemParamsMock];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display 5 menu items at max', () => {
        let menuItems = fixture.debugElement.queryAll(By.css('.c-mobile-fixed-menu__item'));

        expect(menuItems.length).toBe(component.items.length);

        // checking the max allowed items
        component.items = [
            MenuItemParamsMock,
            MenuItemParamsMock,
            MenuItemParamsMock,
            MenuItemParamsMock,
            MenuItemParamsMock,
            MenuItemParamsMock,
        ];
        fixture.detectChanges();

        menuItems = fixture.debugElement.queryAll(By.css('.c-mobile-fixed-menu__item'));

        expect(menuItems.length).toBe(5);
    });

    it('should display menu item properly', () => {
        const menuItem = fixture.debugElement.query(By.css('.c-mobile-fixed-menu__item'));

        // checking text
        const text = menuItem.query(By.css('.c-mobile-fixed-menu__item--text'));

        expect(text.nativeElement.textContent.trim()).toBe(component.items[0].text);

        // checking icon
        const icon = menuItem.query(By.css('.c-mobile-fixed-menu__item--icon'));

        expect(icon.nativeElement.textContent.trim()).toBe(component.items[0].icon);

        // checking route
        const routerLink = menuItem.attributes['ng-reflect-router-link'];

        expect(routerLink).toBe('testRoute');
    });

    it('should have active class when the item is active', async (done: jest.DoneCallback) => {
        let menuItem = fixture.debugElement.query(By.css('.c-mobile-fixed-menu__item'));

        expect(menuItem.classes.active).toBeFalsy();

        fixture.ngZone.run(() => {
            // tslint:disable-next-line: no-floating-promises
            router.navigate(['testRoute']).then(() => {
                fixture.detectChanges();
                menuItem = fixture.debugElement.query(By.css('.c-mobile-fixed-menu__item'));
                expect(menuItem.classes.active).toBe(true);
                done();
            });
        });
    });
});
