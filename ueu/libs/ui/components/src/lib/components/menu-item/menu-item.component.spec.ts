import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// components
import { MatIcon } from '@angular/material/icon';
import { MenuItemComponent } from './menu-item.component';

// modules
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

// ng-mocks
import { MockComponent } from 'ng-mocks';

// mocks
import { DummyComponent } from '../../mocks/dummy.component.mock';

// interfaces
import { MenuItemParams } from '../../interfaces';

describe('MenuItemComponent', () => {
    let component: MenuItemComponent;
    let fixture: ComponentFixture<MenuItemComponent>;
    let router: Router;

    const params: MenuItemParams = { icon: 'testIcon', text: 'testText', route: 'testRoute' };
    const paramsDisabled: MenuItemParams = { icon: 'testIcon', text: 'testText', route: 'testRoute', disabled: true };

    const collapsibleParams: MenuItemParams = {
        icon: 'testIcon',
        text: 'testText',
        route: 'testRoute',
        submenus: [
            { text: 'testTextSubmenu', route: 'testRouteSubmenu' },
            { text: 'testTextSubmenu1', route: 'testRouteSubmenu1', disabled: true },
            { text: 'testTextSubmenu2', route: 'testRouteSubmenu2' },
        ],
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DummyComponent, MenuItemComponent, MockComponent(MatIcon)],
            imports: [RouterTestingModule.withRoutes([{ path: 'testRoute', component: DummyComponent }])],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuItemComponent);
        component = fixture.componentInstance;
        component.params = params;

        router = TestBed.inject(Router);

        fixture.ngZone.run(() => {
            router.initialNavigation();
        });

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have an icon', () => {
        const icon = fixture.debugElement.query(By.css('.c-menu-item__icon'));

        expect(icon).toBeDefined();
        expect(icon.nativeElement.textContent).toBe('testIcon');
    });

    it('should have link text', () => {
        const text = fixture.debugElement.query(By.css('.c-menu-item__text'));

        expect(text).toBeDefined();
        expect(text.nativeElement.textContent).toBe('testText');
    });

    it('should bind the proper route on menu-item', () => {
        const menuItem = fixture.debugElement.query(By.css('.c-menu-item__link'));
        expect(menuItem).toBeDefined();

        const routerLink = menuItem.attributes['ng-reflect-router-link'];
        expect(routerLink).toBe('testRoute');
    });

    it('should have an active mode', async (done: jest.DoneCallback) => {
        let menuItem = fixture.debugElement.query(By.css('.c-menu-item'));

        expect(menuItem.classes.active).toBeFalsy();

        fixture.ngZone.run(() => {
            // tslint:disable-next-line: no-floating-promises
            router.navigate(['testRoute']).then(() => {
                fixture.detectChanges();
                menuItem = fixture.debugElement.query(By.css('.c-menu-item'));
                expect(menuItem.classes.active).toBe(true);
                done();
            });
        });
    });

    it('should have title in anchor element', () => {
        const item = fixture.debugElement.query(By.css('.c-menu-item .c-menu-item__link'));
        expect(item.attributes.title).not.toBeNull();
    });

    // disabled mode tests
    describe('disabled mode', () => {
        beforeEach(() => {
            component.params = paramsDisabled;

            fixture.detectChanges();
        });

        it('should have the class "disabled" when the state is disabled', () => {
            const item = fixture.debugElement.query(By.css('.c-menu-item.disabled'));
            expect(item).not.toBeNull();
        });
    });

    // collapsible version tests
    describe('collapsible mode', () => {
        beforeEach(() => {
            component.params = collapsibleParams;

            fixture.detectChanges();
        });

        it('should not bind any route on menu-item', () => {
            const menuItem = fixture.debugElement.query(By.css('.c-menu-item'));
            expect(menuItem).toBeDefined();

            const routerLink = menuItem.attributes['ng-reflect-router-link'];
            expect(routerLink).toBeUndefined();
        });

        it('should display/hide the submenus on click', () => {
            // I use pure css to this, using the checkbox input.
            // So max-height = 0, unchecked = closed.
            // No max-height and checked = open.

            let input = fixture.debugElement.query(By.css('.c-menu-item__checkbox'));

            // we should expect it to be closed by default.
            expect(input.nativeElement.checked).toBe(false);

            input.nativeElement.click();
            fixture.detectChanges();

            input = fixture.debugElement.query(By.css('.c-menu-item__checkbox'));

            // we should expect it to be closed by default.
            expect(input.nativeElement.checked).toBe(true);
        });

        it('should display the correct submenus', () => {
            const submenuItems = fixture.debugElement.queryAll(By.css('.c-menu-item__submenus--item'));
            expect(submenuItems.length).toBe(collapsibleParams.submenus.length);

            expect(submenuItems[0].nativeElement.textContent.trim()).toEqual(collapsibleParams.submenus[0].text);
            expect(submenuItems[0].attributes['ng-reflect-router-link']).toEqual(collapsibleParams.submenus[0].route);

            expect(submenuItems[1].nativeElement.textContent.trim()).toEqual(collapsibleParams.submenus[1].text);
            expect(submenuItems[1].attributes['ng-reflect-router-link']).toEqual(collapsibleParams.submenus[1].route);

            expect(submenuItems[2].nativeElement.textContent.trim()).toEqual(collapsibleParams.submenus[2].text);
            expect(submenuItems[2].attributes['ng-reflect-router-link']).toEqual(collapsibleParams.submenus[2].route);
        });

        it('should have title in anchor element', () => {
            const item = fixture.debugElement.query(By.css('.c-menu-item.has-submenu'));
            expect(item.attributes.title).not.toBeNull();
        });

        it('should have the class "disabled" when the state is disabled', () => {
            const item = fixture.debugElement.query(By.css('.c-menu-item__submenus--item.disabled'));
            expect(item).not.toBeNull();
        });
    });
});
