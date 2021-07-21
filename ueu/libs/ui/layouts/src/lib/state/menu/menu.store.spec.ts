import { TestBed } from '@angular/core/testing';
import { DashboardLogoOptions, MenuItemParams } from '@picpay/ui/components';

import { CommonLayoutsService } from '../../config/common-layouts.service';
import { CommonLayoutsServiceMock } from '../../config/mocks/common-layouts.service.mock';
import { MenuStore } from './menu.store';

const menuItems: MenuItemParams[] = [
    { icon: 'toggle_on', text: 'Test', route: '/test' },
    { icon: 'toggle_on', text: 'AnotherTest', route: '/another-test' },
];

describe('MenuStore', () => {
    let store: MenuStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: CommonLayoutsService, useClass: CommonLayoutsServiceMock }],
        });

        store = new MenuStore(TestBed.inject(CommonLayoutsService));
    });

    it('should create an instance', () => {
        expect(store).toBeTruthy();
    });

    it('should have updateMenuItems function', () => {
        expect(store.updateMenuItems).toBeDefined();

        const spy = spyOn(store, 'update');

        store.updateMenuItems(menuItems);

        expect(spy).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should have updateMobileMenuItems function', () => {
        expect(store.updateMobileMenuItems).toBeDefined();

        const spy = spyOn(store, 'update');

        store.updateMobileMenuItems(menuItems);

        expect(spy).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should have updateIsMenuOpen(true) function true', () => {
        expect(store.updateIsMenuOpen).toBeDefined();
        store.updateKeepMenuOpen(true);

        const spy = spyOn(store, 'update');

        store.updateIsMenuOpen(true);

        expect(spy).toHaveBeenCalledWith({ isMenuOpen: true });
    });

    it('should have updateIsMenuOpen(false) function with keepMenuOpen true', () => {
        expect(store.updateIsMenuOpen).toBeDefined();
        store.updateKeepMenuOpen(true);

        const spy = spyOn(store, 'update');

        store.updateIsMenuOpen(false);

        expect(spy).not.toHaveBeenCalled();
    });

    it('should have updateIsMenuOpen(true) function with keepMenuOpen false', () => {
        expect(store.updateIsMenuOpen).toBeDefined();
        store.updateKeepMenuOpen(false);

        const spy = spyOn(store, 'update');

        store.updateIsMenuOpen(true);

        expect(spy).toHaveBeenCalledWith({ isMenuOpen: true });
    });

    it('should have updateIsMenuOpen(false) function with keepMenuOpen false', () => {
        expect(store.updateIsMenuOpen).toBeDefined();
        store.updateKeepMenuOpen(false);

        const spy = spyOn(store, 'update');

        store.updateIsMenuOpen(false);

        expect(spy).toHaveBeenCalledWith({ isMenuOpen: false });
    });

    it('should have updateKeepMenuOpen function', () => {
        expect(store.updateKeepMenuOpen).toBeDefined();

        const spy = spyOn(store, 'update');

        store.updateKeepMenuOpen(true);

        expect(spy).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should have updateLogo function', () => {
        expect(store.updateLogo).toBeDefined();

        const spy = spyOn(store, 'update');

        store.updateLogo(DashboardLogoOptions.FEATURE_FLAG);

        expect(spy).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should have updateTitle function', () => {
        expect(store.updateTitle).toBeDefined();

        const spy = spyOn(store, 'update');

        store.updateTitle('testTitle');

        expect(spy).toHaveBeenCalledWith(expect.any(Function));
    });
});
