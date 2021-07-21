import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

// store components
import { MenuService } from './menu.service';
import { MenuStore } from './menu.store';

// mocks
import { MenuStoreMock } from './mocks/menu.store.mock';

describe('MenuService', () => {
    let menuService: MenuService;
    let menuStore: MenuStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MenuService, { provide: MenuStore, useClass: MenuStoreMock }],
            imports: [HttpClientTestingModule],
        });

        menuService = TestBed.inject(MenuService);
        menuStore = TestBed.inject(MenuStore);
    });

    it('should be created', () => {
        expect(menuService).toBeDefined();
    });

    it('should have a setMenuItems function', () => {
        const storeSpy = spyOn(menuStore, 'updateMenuItems');

        menuService.setMenuItems([]);

        expect(storeSpy).toHaveBeenCalledWith([]);
    });

    it('should have a setMobileMenuItems function', () => {
        const storeSpy = spyOn(menuStore, 'updateMobileMenuItems');

        menuService.setMobileMenuItems([]);

        expect(storeSpy).toHaveBeenCalledWith([]);
    });

    it('should have a setIsMenuOpen function', () => {
        const storeSpy = spyOn(menuStore, 'updateIsMenuOpen');

        menuService.setIsMenuOpen(true);

        expect(storeSpy).toHaveBeenCalledWith(true);
    });

    it('should have a setKeepMenuOpen function', () => {
        const storeSpy = spyOn(menuStore, 'updateKeepMenuOpen');

        menuService.setKeepMenuOpen(true);

        expect(storeSpy).toHaveBeenCalledWith(true);
    });
});
