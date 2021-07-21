import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

// store components
import { MenuQuery } from './menu.query';
import { MenuStore } from './menu.store';

// config service
import { CommonLayoutsService } from '../../config/common-layouts.service';

// mocks
import { CommonLayoutsServiceMock } from '../../config/mocks/common-layouts.service.mock';

// rxjs
import { of } from 'rxjs';

describe('MenuQuery', () => {
    let query: MenuQuery;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                { provide: CommonLayoutsService, useClass: CommonLayoutsServiceMock },
                { provide: ActivatedRoute, useValue: { url: of('testUrl') } },
            ],
        });

        query = new MenuQuery(
            new MenuStore(TestBed.inject(CommonLayoutsService)),
            TestBed.inject(ActivatedRoute),
            TestBed.inject(Router),
        );
    });

    it('should create an instance', () => {
        expect(query).toBeTruthy();
    });

    it('should have and menuItems$ observable', () => {
        expect(query.menuItems$).toBeDefined();
    });

    it('should have and mobileMenuItems$ observable', () => {
        expect(query.mobileMenuItems$).toBeDefined();
    });

    it('should have and isMenuOpen$ observable', () => {
        expect(query.isMenuOpen$).toBeDefined();
    });

    it('should have and keepMenuOpen$ observable', () => {
        expect(query.keepMenuOpen$).toBeDefined();
    });

    it('should have and logo$ observable', () => {
        expect(query.logo$).toBeDefined();
    });

    it('should have and title$ observable', () => {
        expect(query.title$).toBeDefined();
    });
});
