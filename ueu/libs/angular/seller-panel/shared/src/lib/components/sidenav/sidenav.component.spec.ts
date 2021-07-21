import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { By } from '@angular/platform-browser';

import { MockModule } from 'ng-mocks';

import { SidenavService } from '@picpay/seller-panel/services';

import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
    let component: SidenavComponent;
    let fixture: ComponentFixture<SidenavComponent>;
    let sidenavService: SidenavService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MockModule(MatSidenavModule), MockModule(MatIconModule)],
            declarations: [SidenavComponent],
            providers: [SidenavService],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SidenavComponent);
        component = fixture.componentInstance;

        component.showCloseButton = true;

        sidenavService = TestBed.inject(SidenavService);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set showCloseButton when sidenavService changes', () => {
        sidenavService.toggleCloseBtn(true);

        expect(component.showCloseButton).toBe(true);

        sidenavService.toggleCloseBtn(false);

        expect(component.showCloseButton).toBe(false);
    });

    it('should #onClose() emits closed event', () => {
        const isClosedEmitterSpy = spyOn(sidenavService, 'close');

        component.onClosed();

        expect(isClosedEmitterSpy).toHaveBeenCalled();
    });

    it('should close sidenav when c-sidenav__container--close-btn is clicked', () => {
        const onCloseFunctionSpy = spyOn(component.sidenav, 'close');
        const closeBtnElement = fixture.debugElement.query(By.css('.c-sidenav__container--close-btn')).nativeElement;

        closeBtnElement.click();

        expect(component.showCloseButton).toBe(true);
        expect(onCloseFunctionSpy).toHaveBeenCalled();
    });
});
