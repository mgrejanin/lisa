import { TestBed } from '@angular/core/testing';

import { SidenavService } from './sidenav.service';

describe('SidenavService', () => {
    let sidenavService: SidenavService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SidenavService],
        });

        sidenavService = TestBed.inject(SidenavService);
    });

    it('should be created', () => {
        expect(sidenavService).toBeTruthy();
    });

    it('should have open function', () => {
        const openedSpy = spyOn(sidenavService.opened$, 'next');

        expect(sidenavService.opened$).toBeDefined();
        expect(sidenavService.opened$).toBeTruthy();

        sidenavService.open();

        expect(openedSpy).toHaveBeenCalledWith(true);
    });

    it('should have close function', () => {
        const openedSpy = spyOn(sidenavService.opened$, 'next');

        expect(sidenavService.opened$).toBeDefined();

        sidenavService.close();

        expect(openedSpy).toHaveBeenCalledWith(false);
    });

    it('should have closed function', () => {
        const closedSpy = spyOn(sidenavService.closed$, 'next');

        expect(sidenavService.closed$).toBeDefined();

        sidenavService.closed();

        expect(closedSpy).toHaveBeenCalledWith(true);
    });

    it('should have next function', () => {
        const nextSpy = spyOn(sidenavService.next$, 'next');

        expect(sidenavService.next$).toBeDefined();

        sidenavService.next();

        expect(nextSpy).toHaveBeenCalled();
    });

    it('should have previous function', () => {
        const previousSpy = spyOn(sidenavService.previous$, 'next');

        expect(sidenavService.previous$).toBeDefined();

        sidenavService.previous();

        expect(previousSpy).toHaveBeenCalled();
    });

    it('should have toggleCloseBtn function', () => {
        const previousSpy = spyOn(sidenavService.showCloseButton$, 'next');

        expect(sidenavService.showCloseButton$).toBeDefined();

        sidenavService.toggleCloseBtn(true);

        expect(previousSpy).toHaveBeenCalledWith(true);

        sidenavService.toggleCloseBtn(false);

        expect(previousSpy).toHaveBeenCalledWith(false);
    });
});
